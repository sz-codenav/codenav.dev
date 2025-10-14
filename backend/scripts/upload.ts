#!/usr/bin/env ts-node

import { NodeSSH } from 'node-ssh';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import fs from 'fs';
// Always use production config for deployment, regardless of NODE_ENV
import { configProd } from '../src/config/config';

const ssh = new NodeSSH();

async function upload() {
  console.log(chalk.blue('📦 Deployment Mode: Always using PRODUCTION configuration\n'));
  
  if (!configProd.deployment) {
    console.error(chalk.red('❌ No deployment configuration found in configProd'));
    console.error(chalk.yellow('Please add a deployment section to configProd in src/config/config.ts'));
    process.exit(1);
  }

  let { host, port, username, password, privateKeyPath, remotePath } = configProd.deployment;
  
  // Check if dist directory exists
  const distPath = path.join(__dirname, '..', 'dist');
  if (!fs.existsSync(distPath)) {
    console.error(chalk.red('❌ dist directory not found. Run "pnpm run build" first.'));
    process.exit(1);
  }

  console.log(chalk.cyan('🚀 Starting deployment to production server...\n'));
  console.log(chalk.gray(`Server: ${username}@${host}:${port}`));
  console.log(chalk.gray(`Remote path: ${remotePath}\n`));

  const connectSpinner = ora('Connecting to server...').start();

  try {
    // Connect to server
    const connectionConfig: any = {
      host,
      port,
      username,
      readyTimeout: 10000,
      tryKeyboard: true
    };

    // Use SSH key if provided, otherwise use password
    if (privateKeyPath) {
      if (!fs.existsSync(privateKeyPath)) {
        connectSpinner.fail(`SSH key not found at: ${privateKeyPath}`);
        process.exit(1);
      }
      connectionConfig.privateKey = fs.readFileSync(privateKeyPath, 'utf8');
      console.log(chalk.gray(`Using SSH key: ${privateKeyPath}`));
    } else if (password) {
      connectionConfig.password = password;
      console.log(chalk.gray('Using password authentication'));
    } else {
      connectSpinner.fail('No authentication method configured. Please provide either password or privateKeyPath in config.');
      process.exit(1);
    }

    await ssh.connect(connectionConfig);
    connectSpinner.succeed('Connected to server');
    
    // Expand tilde in remotePath if present
    if (remotePath.startsWith('~')) {
      const { stdout } = await ssh.execCommand('echo $HOME');
      remotePath = remotePath.replace('~', stdout.trim());
      console.log(chalk.gray(`Expanded path: ${remotePath}`));
    }

    // Create remote directory if it doesn't exist
    const mkdirSpinner = ora('Creating remote directory...').start();
    await ssh.execCommand(`mkdir -p ${remotePath}`);
    mkdirSpinner.succeed('Remote directory ready');

    // Create backup of existing deployment
    const backupSpinner = ora('Creating backup of existing deployment...').start();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const backupPath = `${remotePath}_backup_${timestamp}`;
    
    const { code: backupCode } = await ssh.execCommand(`
      if [ -d "${remotePath}" ] && [ "$(ls -A ${remotePath})" ]; then
        cp -r ${remotePath} ${backupPath}
        echo "Backup created at ${backupPath}"
      else
        echo "No existing deployment to backup"
      fi
    `);
    
    if (backupCode === 0) {
      backupSpinner.succeed('Backup created successfully');
    } else {
      backupSpinner.warn('No existing deployment to backup');
    }

    // Clear the remote directory (except backups)
    const clearSpinner = ora('Clearing remote directory...').start();
    await ssh.execCommand(`find ${remotePath} -mindepth 1 -maxdepth 1 ! -name '*backup*' -exec rm -rf {} +`);
    clearSpinner.succeed('Remote directory cleared');

    // Upload dist directory
    const uploadSpinner = ora('Uploading dist files...').start();
    
    const failed: string[] = [];
    const successful: string[] = [];
    
    await ssh.putDirectory(distPath, remotePath, {
      recursive: true,
      concurrency: 10,
      validate: (itemPath) => {
        const baseName = path.basename(itemPath);
        return baseName !== '.DS_Store' && !baseName.startsWith('.');
      },
      tick: (localPath, _remotePath, error) => {
        if (error) {
          failed.push(localPath);
          uploadSpinner.text = `Uploading... (${successful.length} succeeded, ${failed.length} failed)`;
        } else {
          successful.push(localPath);
          uploadSpinner.text = `Uploading... (${successful.length} files uploaded)`;
        }
      }
    });

    if (failed.length > 0) {
      uploadSpinner.warn(`Upload completed with ${failed.length} failures`);
      console.log(chalk.yellow('\nFailed files (this is often due to permissions):'));
      failed.forEach(file => {
        const fileName = path.basename(file);
        console.log(chalk.yellow(`  - ${fileName}`));
      });
      
      if (successful.length > 0) {
        console.log(chalk.green(`\nSuccessfully uploaded: ${successful.length} files`));
      }
      
      // Try to set permissions
      console.log(chalk.cyan('\nAttempting to fix permissions...'));
      await ssh.execCommand(`chmod -R 755 ${remotePath}`);
    } else {
      uploadSpinner.succeed(`Successfully uploaded ${successful.length} files`);
    }

    // Upload package.json and other necessary files
    const configSpinner = ora('Uploading configuration files...').start();
    
    const filesToUpload = [
      'package.json',
      'pnpm-lock.yaml',
      'README.md'
    ];

    for (const file of filesToUpload) {
      const localFile = path.join(__dirname, '..', file);
      if (fs.existsSync(localFile)) {
        await ssh.putFile(localFile, `${remotePath}/${file}`);
      }
    }
    configSpinner.succeed('Configuration files uploaded');

    console.log(chalk.green('\n✅ Deployment completed successfully!\n'));

    // Display summary
    console.log(chalk.cyan('📊 Deployment Summary:'));
    console.log(chalk.gray(`  - Files uploaded: ${successful.length}`));
    console.log(chalk.gray(`  - Backup created: ${backupPath}`));
    console.log(chalk.gray(`  - Remote path: ${remotePath}`));
    console.log(chalk.gray(`  - Server: ${host}\n`));

    // Manual instructions
    console.log(chalk.yellow('📝 Next steps on your server:'));
    console.log(chalk.cyan(`  1. SSH to server: ssh ${username}@${host}`));
    console.log(chalk.cyan(`  2. Navigate to: cd ${remotePath}`));
    console.log(chalk.cyan(`  3. Install dependencies: npm install --production`));
    console.log(chalk.cyan(`  4. Run application: node dist/server.js`));
    console.log(chalk.cyan(`  5. Or with PM2: pm2 start dist/server.js --name codenav-backend\n`));

  } catch (error) {
    connectSpinner.fail('Deployment failed');
    console.error(chalk.red('\n❌ Error during deployment:'));
    console.error(error);
    process.exit(1);
  } finally {
    ssh.dispose();
  }
}

// Run the upload
upload().catch(error => {
  console.error(chalk.red('Unexpected error:'), error);
  process.exit(1);
});
# Deployment Scripts

## Upload Script

The `upload.ts` script automates deployment of the backend to a production server via SSH.

### Features
- 🔐 Supports both password and SSH key authentication
- 📦 Automatic backup creation before deployment
- 🚀 Uploads compiled dist folder and configuration files
- 📦 Installs production dependencies on the server
- 🔄 Attempts to restart the application (PM2 compatible)
- 📊 Provides detailed deployment progress and summary

### Configuration

Edit the deployment configuration in `src/config/config.ts`:

```typescript
deployment: {
  host: 'your-server.com',
  port: 22,
  username: 'deploy-user',
  
  // Option 1: Password authentication
  password: 'your-ssh-password',
  
  // Option 2: SSH key authentication (more secure)
  // privateKeyPath: '/Users/yourname/.ssh/id_rsa',
  
  remotePath: '/var/www/codenav-backend'
}
```

### Usage

```bash
# Build and deploy to production
# Always uses production configuration from configProd
pnpm run deploy
```

**Note:** The deploy command ALWAYS uses the production configuration (`configProd`), regardless of your current NODE_ENV setting. This ensures you never accidentally deploy development settings to production.

### What happens during deployment:

1. **Build** - Compiles TypeScript to JavaScript
2. **Connect** - Establishes SSH connection to server
3. **Backup** - Creates timestamped backup of existing deployment
4. **Clear** - Removes old files (except backups)
5. **Upload** - Transfers dist folder and config files
6. **Install** - Runs `pnpm install --prod` on server
7. **Restart** - Attempts to restart app with PM2

### Prerequisites on Server

- Node.js installed
- pnpm installed globally
- PM2 installed (optional, for auto-restart)
- MySQL database configured

### Security Notes

- **Never commit passwords** to version control
- Use SSH keys instead of passwords when possible
- Store sensitive credentials in environment variables
- Consider using a secrets management service

### SSH Key Setup

1. Generate an SSH key pair (if you don't have one):
```bash
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
```

2. Copy public key to server:
```bash
ssh-copy-id deploy-user@your-server.com
```

3. Update config to use SSH key:
```typescript
deployment: {
  // ... other config
  privateKeyPath: '/Users/yourname/.ssh/id_rsa',
  // Remove or comment out password
}
```

### Troubleshooting

- **Connection refused**: Check SSH port and firewall settings
- **Permission denied**: Verify username/password or SSH key
- **Dependencies fail**: Ensure pnpm is installed on server
- **App won't restart**: Check PM2 installation or restart manually
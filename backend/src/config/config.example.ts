import { Config } from '../types';

/**
 * Development Configuration
 * Used when NODE_ENV=development or not set
 */
const configDev: Config = {
  env: 'development',
  port: 3001,
  apiPrefix: '/api',
  
  database: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'your_dev_password_here',
    database: 'codenav_dev',
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
  },
  
  cors: {
    origin: 'http://localhost:5173', // Your frontend dev server URL
    credentials: true,
    optionsSuccessStatus: 200
  },
  
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window
    message: 'Too many requests from this IP, please try again later.'
  }
};

/**
 * Production Configuration
 * Used when NODE_ENV=production
 */
const configProd: Config = {
  env: 'production',
  port: 3000,
  apiPrefix: '/api',
  
  database: {
    host: 'your-mysql-server.example.com', // Your production MySQL host
    port: 3306,
    user: 'codenav_prod_user',
    password: 'your_secure_prod_password_here',
    database: 'codenav_prod',
    connectionLimit: 20,
    waitForConnections: true,
    queueLimit: 0
  },
  
  cors: {
    origin: 'https://your-domain.com', // Your production frontend URL
    credentials: true,
    optionsSuccessStatus: 200
  },
  
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Stricter limit for production
    message: 'Too many requests from this IP, please try again later.'
  },
  
  // Deployment configuration (optional, only needed if using upload script)
  deployment: {
    host: 'your-server.example.com', // Your server hostname or IP
    port: 22, // SSH port (default: 22)
    username: 'deploy-user', // SSH username
    
    // Option 1: Password authentication (less secure)
    password: 'your-ssh-password',
    
    // Option 2: SSH key authentication (recommended)
    // Comment out password and uncomment this line:
    // privateKeyPath: '/Users/yourname/.ssh/id_rsa',
    
    remotePath: '/var/www/codenav-backend' // Where to deploy on the server
  }
};

// Automatically select config based on NODE_ENV
const env = process.env.NODE_ENV || 'development';
const config = env === 'production' ? configProd : configDev;

export default config;
export { configDev, configProd };

/**
 * Configuration Guide:
 * 
 * 1. Copy this file to 'config.ts'
 * 2. Update all placeholder values with your actual configuration
 * 3. Never commit the actual config.ts file with real credentials
 * 
 * Database Setup:
 * - Development: Usually localhost MySQL
 * - Production: Your cloud/remote MySQL server
 * 
 * CORS Setup:
 * - Development: Your local frontend dev server (e.g., Vite on port 5173)
 * - Production: Your actual domain (e.g., https://codenav.dev)
 * 
 * Deployment Setup (Optional):
 * - Only needed if using the upload.ts deployment script
 * - SSH key authentication is more secure than passwords
 * - Ensure your server has Node.js, pnpm, and optionally PM2 installed
 * 
 * Security Tips:
 * - Use environment variables for sensitive data in production
 * - Use SSH keys instead of passwords for deployment
 * - Keep different credentials for dev and production databases
 * - Regularly rotate passwords and keys
 */
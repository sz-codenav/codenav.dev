import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Server } from 'http';

import config from './config/config';
import { initializeDatabase, closeDatabase } from './config/database';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import contactRoutes from './routes/contactRoutes';
import healthRoutes from './routes/healthRoutes';

const app: Application = express();

app.use(helmet());
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit(config.rateLimit);
app.use(`${config.apiPrefix}/contacts`, limiter);

app.use(config.apiPrefix, healthRoutes);
app.use(`${config.apiPrefix}/contacts`, contactRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async (): Promise<void> => {
  try {
    await initializeDatabase();
    
    const server: Server = app.listen(config.port, () => {
      console.log('🚀 Server is running');
      console.log(`📍 Environment: ${config.env}`);
      console.log(`🔗 URL: http://localhost:${config.port}`);
      console.log(`🔗 API Prefix: ${config.apiPrefix}`);
      console.log(`✅ Health check: http://localhost:${config.port}${config.apiPrefix}/health`);
    });

    const gracefulShutdown = async (signal: string): Promise<void> => {
      console.log(`\n${signal} received. Starting graceful shutdown...`);
      
      server.close(async () => {
        console.log('📤 HTTP server closed');
        await closeDatabase();
        console.log('👋 Graceful shutdown completed');
        process.exit(0);
      });
      
      setTimeout(() => {
        console.error('❌ Graceful shutdown timeout, forcing exit');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
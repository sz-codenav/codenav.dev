import { Router, Request, Response } from 'express';
import { getPool } from '../config/database';
import { ApiResponse } from '../types';

const router: Router = Router();

interface HealthResponse extends ApiResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  environment: string;
  database: 'connected' | 'disconnected';
}

router.get('/health', async (_req: Request, res: Response<HealthResponse>): Promise<void> => {
  try {
    const pool = getPool();
    await pool.query('SELECT 1');
    
    res.json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: 'connected'
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: 'disconnected',
      error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
    });
  }
});

router.get('/ping', (_req: Request, res: Response<ApiResponse>): void => {
  res.json({ 
    success: true,
    message: 'pong',
    data: {
      timestamp: new Date().toISOString()
    }
  });
});

export default router;
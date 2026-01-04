import { IncomingMessage, ServerResponse } from 'http';
import { createLogger } from '../logger';

const logger = createLogger('HTTP');

export interface RequestLogData {
  method: string;
  url: string;
  statusCode?: number;
  duration?: number;
  userAgent?: string;
  ip?: string;
  error?: any;
}

/**
 * Middleware to log HTTP requests and responses
 */
export function logRequest(
  req: IncomingMessage,
  res: ServerResponse,
  callback?: () => void
): void {
  const startTime = Date.now();

  const logData: RequestLogData = {
    method: req.method || 'UNKNOWN',
    url: req.url || '/',
    userAgent: req.headers['user-agent'],
    ip: req.socket.remoteAddress,
  };

  // Log incoming request
  logger.http(`Incoming ${logData.method} request`, {
    url: logData.url,
    userAgent: logData.userAgent,
    ip: logData.ip,
  });

  // Capture the original end function
  const originalEnd = res.end;

  // Override the end function to log response
  res.end = function (this: ServerResponse, chunk?: any, encoding?: any, callback?: any): any {
    const duration = Date.now() - startTime;
    logData.statusCode = res.statusCode;
    logData.duration = duration;

    // Determine log level based on status code
    if (res.statusCode >= 500) {
      logger.error(`Request completed with server error`, logData);
    } else if (res.statusCode >= 400) {
      logger.warn(`Request completed with client error`, logData);
    } else {
      logger.http(`Request completed successfully`, logData);
    }

    // Call the original end function
    return originalEnd.call(this, chunk, encoding, callback);
  };

  if (callback) {
    callback();
  }
}

/**
 * Log an error during request processing
 */
export function logRequestError(
  req: IncomingMessage,
  error: Error | any,
  statusCode: number = 500
): void {
  logger.error(`Request error`, {
    method: req.method,
    url: req.url,
    statusCode,
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name,
    },
    userAgent: req.headers['user-agent'],
    ip: req.socket.remoteAddress,
  });
}

/**
 * Log API endpoint registration
 */
export function logApiEndpoint(path: string, methods: string | string[]): void {
  const methodStr = Array.isArray(methods) ? methods.join(', ') : methods;
  logger.info(`Registered API endpoint`, {
    path,
    methods: methodStr,
  });
}

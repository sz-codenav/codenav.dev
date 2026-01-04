/**
 * Logger Configuration
 *
 * Configure logging behavior through environment variables:
 * - LOG_LEVEL: Set minimum log level (error, warn, info, http, debug)
 * - LOG_DIR: Set directory for log files (default: logs/)
 * - LOG_MAX_FILES: Set number of days to keep logs (default: 14d for combined, 30d for errors)
 * - LOG_MAX_SIZE: Set maximum file size before rotation (default: 20m)
 * - DISABLE_CONSOLE_LOGS: Set to 'true' to disable console logging
 * - DISABLE_FILE_LOGS: Set to 'true' to disable file logging
 */

export interface LoggerConfig {
  level: string;
  logDir: string;
  maxFiles: {
    combined: string;
    error: string;
    http: string;
  };
  maxSize: string;
  enableConsole: boolean;
  enableFile: boolean;
  enableColors: boolean;
}

export function getLoggerConfig(): LoggerConfig {
  const isDevelopment = (process.env.NODE_ENV || 'development') === 'development';

  return {
    level: process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info'),
    logDir: process.env.LOG_DIR || 'logs',
    maxFiles: {
      combined: process.env.LOG_MAX_FILES_COMBINED || '14d',
      error: process.env.LOG_MAX_FILES_ERROR || '30d',
      http: process.env.LOG_MAX_FILES_HTTP || '7d',
    },
    maxSize: process.env.LOG_MAX_SIZE || '20m',
    enableConsole: process.env.DISABLE_CONSOLE_LOGS !== 'true',
    enableFile: process.env.DISABLE_FILE_LOGS !== 'true',
    enableColors: isDevelopment,
  };
}

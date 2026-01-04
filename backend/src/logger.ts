import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import { getLoggerConfig } from './logger.config';

// Get logger configuration
const config = getLoggerConfig();

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);

// Custom format for console output
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  config.enableColors ? winston.format.colorize({ all: true }) : winston.format.uncolorize(),
  winston.format.printf((info) => {
    const { timestamp, level, message, context, ...meta } = info;
    const contextStr = context ? `[${context}]` : '';
    const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : '';
    return `[${timestamp}] ${level} ${contextStr} ${message}${metaStr}`;
  })
);

// Custom format for file output (JSON for easy parsing)
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Create logs directory path
const logsDir = path.join(__dirname, '..', config.logDir);

// Configure transports based on configuration
const transports: winston.transport[] = [];

// Add console transport if enabled
if (config.enableConsole) {
  transports.push(
    new winston.transports.Console({
      format: consoleFormat,
    })
  );
}

// Add file transports if enabled
if (config.enableFile) {
  transports.push(
    // Error logs - separate file for errors only
    new DailyRotateFile({
      filename: path.join(logsDir, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      format: fileFormat,
      maxSize: config.maxSize,
      maxFiles: config.maxFiles.error,
      zippedArchive: true,
    }),

    // Combined logs - all logs
    new DailyRotateFile({
      filename: path.join(logsDir, 'combined-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      format: fileFormat,
      maxSize: config.maxSize,
      maxFiles: config.maxFiles.combined,
      zippedArchive: true,
    }),

    // HTTP logs - for request/response logging
    new DailyRotateFile({
      filename: path.join(logsDir, 'http-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'http',
      format: fileFormat,
      maxSize: config.maxSize,
      maxFiles: config.maxFiles.http,
      zippedArchive: true,
    })
  );
}

// Create the logger
const logger = winston.createLogger({
  level: config.level,
  levels,
  transports,
  exitOnError: false,
});

// Log initial configuration in debug mode
if (config.level === 'debug') {
  logger.debug('Logger initialized', {
    context: 'Logger',
    level: config.level,
    consoleEnabled: config.enableConsole,
    fileEnabled: config.enableFile,
    logDir: logsDir,
  });
}

// Helper class for structured logging
export class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  error(message: string, meta?: any): void {
    logger.error(message, { context: this.context, ...meta });
  }

  warn(message: string, meta?: any): void {
    logger.warn(message, { context: this.context, ...meta });
  }

  info(message: string, meta?: any): void {
    logger.info(message, { context: this.context, ...meta });
  }

  http(message: string, meta?: any): void {
    logger.http(message, { context: this.context, ...meta });
  }

  debug(message: string, meta?: any): void {
    logger.debug(message, { context: this.context, ...meta });
  }

  // Method for logging with custom data
  log(level: keyof typeof levels, message: string, meta?: any): void {
    logger.log(level, message, { context: this.context, ...meta });
  }
}

// Export a default logger instance
export default logger;

// Export convenience functions for backward compatibility
export function log(context: string, message: string, data?: any): void {
  logger.info(message, { context, ...data });
}

export function error(context: string, message: string, data?: any): void {
  logger.error(message, { context, error: data });
}

export function warn(context: string, message: string, data?: any): void {
  logger.warn(message, { context, ...data });
}

export function debug(context: string, message: string, data?: any): void {
  logger.debug(message, { context, ...data });
}

export function http(context: string, message: string, data?: any): void {
  logger.http(message, { context, ...data });
}

// Export a factory function to create loggers with context
export function createLogger(context: string): Logger {
  return new Logger(context);
}

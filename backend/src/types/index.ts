export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  connectionLimit: number;
  waitForConnections: boolean;
  queueLimit: number;
}

export interface CorsConfig {
  origin: string;
  credentials: boolean;
  optionsSuccessStatus: number;
}

export interface RateLimitConfig {
  windowMs: number;
  max: number;
  message: string;
}

export interface DeploymentConfig {
  host: string;
  port: number;
  username: string;
  password?: string;
  privateKeyPath?: string;
  remotePath: string;
  nodePath?: string; // Optional: explicit path to node installation, e.g., '/usr/local/bin'
}

export interface Config {
  env: string;
  port: number;
  apiPrefix: string;
  database: DatabaseConfig;
  cors: CorsConfig;
  rateLimit: RateLimitConfig;
  deployment?: DeploymentConfig;
}

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Contact extends ContactData {
  id?: number;
  status?: 'pending' | 'read' | 'responded' | 'archived';
  created_at?: Date;
  updated_at?: Date;
}

export interface PaginationQuery {
  limit?: string;
  offset?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
  error?: string;
}

export interface PaginationResponse {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}
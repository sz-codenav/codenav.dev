import config from "./config";
import { createLogger } from "./logger";
import fs from "fs";
import { handleRequest } from "./request";
import http from "http";
import { logRequest } from "./middleware/requestLogger";
import mysql from "mysql2/promise";
import path from "path";

const logger = createLogger('Server');

// 创建连接池
export const pool = mysql.createPool({
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  database: config.database.database,
  password: config.database.password,
  timezone: config.database.timezone,
  waitForConnections: true,
  connectionLimit: 10, // Maximum connection limit
  queueLimit: 0, // Queue limit, 0 means no limit
});

const setupDirs: string[] = [];
for (const dir of setupDirs) {
  const dirs = dir.split("/");
  let currentDir = __dirname.replace("/src", "");
  for (const dir of dirs) {
    currentDir = path.join(currentDir, dir);
    if (!fs.existsSync(currentDir)) {
      fs.mkdirSync(currentDir, { recursive: true });
    }
  }
}

export const sql = {
  exec: async (command: string, params: any[]) => {
    let connection;
    try {
      // Get a connection from the pool 
      connection = await pool.getConnection();
      const [rows] = await connection.execute<any>(command, params);
      return rows;
    } catch (err) {
      logger.error("SQL execution error", {
        timestamp: new Date().toLocaleString(),
        error: err,
        command,
        params,
      });
      throw err;
    } finally {
      if (connection) {
        // Release the connection back to the pool
        connection.release();
      }
    }
  },
};

const server = http.createServer((req, res) => {
  // Log the request
  logRequest(req, res);

  const chunks: Buffer[] = [];
  req.on("data", (chunk) => {
    chunks.push(chunk);
  });
  req.on("end", () => {
    const body = Buffer.concat(chunks);
    // Add CORS headers
    res.setHeader("Access-Control-Allow-Origin", "localhost");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    handleRequest(req, res, body, new Request("https://sso.codenav.dev/api" + req.url!, { method: req.method, headers: req.headers as HeadersInit, body: ["GET", "HEAD"].includes(req.method!) ? null : body.toString() }));
  });
});

const port = 3810;
server.listen(port, () => {
  logger.info(`Server running at http://47.76.223.175:${port}/`);
  // read ../package.json
  const { version } = require("../package.json");
  logger.info(`Server Version: ${version}`);
});

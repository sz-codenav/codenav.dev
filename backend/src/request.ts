import { IncomingMessage, ServerResponse } from "http";
import { logApiEndpoint, logRequestError } from "./middleware/requestLogger";

import { RequestMethod } from "./enums";
import { createLogger } from "./logger";

const logger = createLogger('Request');

const serverPages: ServerPage[] = [];

const fs = require("fs");
const path = require("path");
const apiFolder = path.join(__dirname, "api");

logger.info("Finding API files in folder", { folder: apiFolder });
function readFolder(folder: string) {
  const files = fs.readdirSync(folder);
  files.forEach((file: any) => {
    const filePath = path.join(folder, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      readFolder(filePath);
    } else if (file.endsWith(".ts") || file.endsWith(".js")) {
      try {
        const apiModule = require(filePath).default;
        if (apiModule && typeof apiModule.main === "function") {
          serverPages.push(apiModule);
          logApiEndpoint(apiModule.path, apiModule.methods);
        } else {
          logger.error(`Invalid API file ${file}: main function not found or not a function`);
        }
      } catch (error: any) {
        logger.error(`Failed to load API file ${file}:`, { error: error.message, stack: error.stack });
      }
    }
  });
}
readFolder(apiFolder);
logger.info(`Loaded ${serverPages.length} API endpoint(s)`);

export interface ServerPage {
  methods: RequestMethod | RequestMethod[];
  main: (
    data: { [key: string]: any },
    request: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    body: Buffer,
    _req: Request
  ) => Promise<any> | any;
  path: string;
  params: RequestParams;
  json?: boolean;
}

interface RequestParams {
  [key: string]: RequestParams | DataType;
}

type DataType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "array"
  | "string!"
  | "number!"
  | "boolean!"
  | "object!"
  | "array!";

export async function handleRequest(
  request: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  body: Buffer,
  _req: Request
): Promise<undefined | "processed"> {
  const url = new URL("http://47.76.223.175" + request.url!);
  const path = url.pathname;
  const method = `${request.method}`.toLowerCase();

  logger.debug(`Processing request`, { method: request.method, url: request.url, path });

  const serverPage = serverPages.find((page) => {
    return page.path === path.replace("/api", "");
  });
  if (!serverPage) {
    logger.warn(`Cannot find API endpoint for path: ${path}`);
    return generateResponse(res, 404, "Cannot find API endpoint");
  }

  // check request method allowed
  const allowedMethods = Array.isArray(serverPage.methods)
    ? serverPage.methods
    : [serverPage.methods];
  if (!allowedMethods.includes(method as RequestMethod)) {
    logger.warn(`Method ${method} not allowed for path: ${path}`, {
      allowedMethods: allowedMethods.join(", ")
    });
    return generateResponse(res, 405, `Method ${method} not allowed`);
  }

  // check request params
  let data: any;
  if (method === RequestMethod.GET) {
    data = Object.fromEntries(url.searchParams.entries());
  } else {
    try {
      data = JSON.parse(body.toString());
      logger.debug("Request body parsed", { bodySize: body.length });
    } catch (error: any) {
      data = body.toString();
      if (serverPage.json !== false) {
        logger.warn("Invalid JSON in request body", { error: error.message, url: url.toString() });
        return generateResponse(res, 400, "Invalid JSON");
      }
    }
  }

  // check missing params or invalid types
  function checkParams(params: RequestParams, data: any) {
    for (const [key, value] of Object.entries(params)) {
      if (typeof data[key] === "undefined" || data[key] === null) {
        if (
          (typeof value === "string" && value.endsWith("!")) ||
          typeof value === "object"
        ) {
          return generateResponse(
            res,
            400,
            `Missing required parameter ${key}`
          );
        }
      } else {
        if (typeof value === "object") {
          if (typeof data[key] !== "object") {
            return generateResponse(
              res,
              400,
              `Invalid type for parameter ${key}`
            );
          }
          checkParams(value, data[key]);
        }

        if (value === "number" || value === "number!") {
          if (isNaN(data[key]) && ![undefined, null].includes(data[key])) {
            return generateResponse(
              res,
              400,
              `Invalid type for parameter ${key}`
            );
          }
        }
        if (value === "boolean" || value === "boolean!") {
          if (
            typeof data[key] !== "boolean" &&
            ![undefined, null].includes(data[key])
          ) {
            return generateResponse(
              res,
              400,
              `Invalid type for parameter ${key}`
            );
          }
        }
        if (value === "string" || value === "string!") {
          if (
            typeof data[key] !== "string" &&
            ![undefined, null].includes(data[key])
          ) {
            return generateResponse(
              res,
              400,
              `Invalid type for parameter ${key}`
            );
          }
        }
        if (value === "object" || value === "object!") {
          if (
            typeof data[key] !== "object" &&
            ![undefined, null].includes(data[key])
          ) {
            return generateResponse(
              res,
              400,
              `Invalid type for parameter ${key}`
            );
          }
        }
        if (value === "array" || value === "array!") {
          if (
            !Array.isArray(data[key]) &&
            ![undefined, null].includes(data[key])
          ) {
            return generateResponse(
              res,
              400,
              `Invalid type for parameter ${key}`
            );
          }
        }
      }
    }
  }
  const checkParamsResult = checkParams(serverPage.params, data);
  if (checkParamsResult) {
    return checkParamsResult;
  }

  return new Promise((resolve, reject) => {
    let response: any | Promise<any>;
    try {
      response = serverPage.main(data, request, res, body, new Request("https://sso.codenav.dev/api" + request.url!, { method: request.method, headers: request.headers as HeadersInit, body: ["GET", "HEAD"].includes(request.method!) ? null : body.toString() }));
    } catch (error: Error | any) {
      logRequestError(request, error, 500);
      return generateResponse(
        res,
        500,
        "Internal server error: " + error.message || error
      );
    }
    if (response instanceof Promise) {
      response
        .then((resp) => {
          // res || generateResponse(res, 204, "No Content");
          if (resp === "processed") {
            resolve(resp);
          } else if (resp !== undefined) {
            resolve(generateResponse(res, 200, resp));
          } else {
            resolve(
              generateResponse(res, 500, "Internal server error: No response")
            );
          }
        })
        .catch((err) => {
          logRequestError(request, err, 500);
          resolve(
            generateResponse(
              res,
              500,
              "Internal server error: " + err.message
            )
          );
        });
    } else if (response === "processed") {
      resolve(response);
    } else if (response !== undefined) {
      resolve(generateResponse(res, 200, response));
    } else {
      resolve(generateResponse(res, 500, "Internal server error: No response"));
    }
  });
}

export function generateResponse(
  res: ServerResponse<IncomingMessage>,
  code: number,
  data: string | { [key: string]: any } | ReadableStream,
  headers: { [key: string]: string } = {}
): "processed" {
  if (typeof data === "string") {
    data = { message: data };
  }
  // return new Response(
  //   JSON.stringify({
  //     code,
  //     success: code >= 200 && code < 300,
  //     ...data,
  //   }),
  //   {
  //     status: code,
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  //       "Access-Control-Allow-Headers": "Content-Type",
  //     },
  //   }
  // );
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value);
  }

  if (headers["better-auth-set-cookie"]) {
    res.setHeader("Set-Cookie", headers["better-auth-set-cookie"].split("*split*"))
    logger.debug("Set-Cookie", { cookies: headers["better-auth-set-cookie"].split("*split*"), _cookies: headers["better-auth-set-cookie"] });
  }

  if (data instanceof ReadableStream) {
    // const reader = data.getReader();
    // while (true) {
    //   const { done, value } = await reader.read();
    //   if (done) break;
    //   res.write(value);
    // }
    // res.end();
    const reader = data.getReader();
    function read() {
      reader.read().then(({ done, value }) => {
        if (done) {
          res.end();
        } else {
          res.write(value);
          read();
        }
      });
    }
    read();
  } else {
    res.end(
      JSON.stringify({
        code,
        success: code >= 200 && code < 300,
        ...data,
      })
    );
  }
  return "processed";
}

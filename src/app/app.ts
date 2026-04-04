import express from "express";
import type { Application } from "express";
import todoRouter from "./todo/route.js";
import { errorHandler } from "../middleware/error.middleware.js";
import logger from "../middleware/logger.js";

export function createExpressApp(): Application {
  const app = express();

  // middlewares
  app.use(express.json());
  app.use(logger);
  // routes
  app.use("/todos", todoRouter);
  // middleware
  app.use(errorHandler);

  return app;
}

import express from "express";
import type { Application } from "express";

export function createExpressApp(): Application {
  const app = express();

  // middlewares
  app.use(express.json());
  app.use((req, res, next) => {
    console.log(
      `_logging: ${req.method} ${req.originalUrl}, at ${new Date().toLocaleString()}`,
    );
    next();
  });

  // routes

  return app;
}

import express from "express";
import type { Application } from "express";

export function createExpressApp(): Application {
  const app = express();

  // middlewares
  app.use(express.json());

  // routes
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Express setup is done",
    });
  });

  return app;
}

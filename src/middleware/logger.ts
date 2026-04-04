import type { Request, Response, NextFunction } from "express";

const logger = function (req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.originalUrl} [${new Date().toISOString()}]`);
  next();
};

export default logger;

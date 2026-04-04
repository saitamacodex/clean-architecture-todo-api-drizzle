import type { Request, Response, NextFunction } from "express";

export const asyncHandler = (fn: Function) => {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      next(error);
    });
  };
};

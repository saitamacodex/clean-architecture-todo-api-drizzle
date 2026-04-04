import type { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError.js";

export const errorHandler = function (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // handle known errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.error || null,
    });
  }
  // unknown error
  console.error(err);
};

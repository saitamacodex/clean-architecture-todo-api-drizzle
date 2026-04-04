import type { Response } from "express";

class ApiResponse {
  public static OK<T>(res: Response, data: T, message = "Success"): Response {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }

  public static CREATED<T>(
    res: Response,
    data: T,
    message = "Created",
  ): Response {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  }
}

export default ApiResponse;

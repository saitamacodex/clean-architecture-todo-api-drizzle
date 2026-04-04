class ApiError extends Error {
  public statusCode: number;
  public error?: unknown; // ? reqpresent optional

  constructor(statusCode: number, message: string, error?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }

  public static BAD_REQUEST(message = "Bad Request", error?: unknown) {
    return new ApiError(400, message, error);
  }

  public static NOT_FOUND(message = "Not Found") {
    return new ApiError(404, message);
  }

  public static INTERNAL_SERVER_ERROR(
    message = "Internal Server Error",
    error?: unknown,
  ) {
    return new ApiError(500, message, error);
  }
}

export default ApiError;

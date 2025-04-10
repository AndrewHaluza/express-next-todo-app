import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import logger from "../shared/utils/logger";

export const globalErrorHandlerMiddleware = (
  error: Error & { cause?: { status?: number } } & Joi.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  let message = error.message || "Internal Server Error";
  let status = error.cause?.status || 500;

  logger.error(error);

  if (error instanceof Joi.ValidationError) {
    status = 400;
    message = `Validation Error: ${error.details
      .map((detail) => detail.message)
      .join(", ")}`;
  }

  const response: { status: number; json: Record<string, any> } = {
    status,
    json: { message: message },
  };

  res.status(response.status).send(response.json);
};

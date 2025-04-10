import { NextFunction } from "express";

export function notFoundMiddleware(
  req: Express.Request,
  res: Express.Response,
  next: NextFunction
) {
  const error = new Error("Not Found", { cause: { status: 404 } });

  next(error);
}

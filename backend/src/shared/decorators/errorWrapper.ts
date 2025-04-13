import { Request, Response, NextFunction } from "express";

export function errorWrapperDecorator(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value; // Store the original method

  descriptor.value = async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await originalMethod.call(this, req, res, next);

      return result;
    } catch (error) {
      next(error);
    }
  };

  return descriptor;
}

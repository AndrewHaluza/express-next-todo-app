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
      console.debug(1111111111111);
      const result = await originalMethod.call(this, req, res, next);
      console.debug({ result });

      return result;
    } catch (error) {
      console.debug(2222222);

      next(error);
    }
  };

  return descriptor;
}

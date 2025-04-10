import Joi from "joi";
import { NextFunction } from "express";

export function Validate(
  schema: Joi.ObjectSchema,
  type: "body" | "query" | "params" = "body"
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        await schema.validateAsync(req[type], { abortEarly: false }); // you can also validate req.params or req.query
        return originalMethod.apply(this, [req, res, next]);
      } catch (err) {
        next(err);
      }
    };

    return descriptor;
  };
}

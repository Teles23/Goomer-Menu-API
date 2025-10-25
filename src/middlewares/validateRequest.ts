import { type Request, type Response, type NextFunction } from "express";
import Joi from "joi";

export function validate(
  schema: Joi.ObjectSchema,
  property: "body" | "params" | "query" | "headers" = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property], {
      abortEarly: false,
      convert: true,
    });

    if (error) {
      const errors: Record<string, string> = {};
      error.details.forEach((d) => {
        const key = d.path[0] as string; // pega o nome do campo
        errors[key] = d.message;
      });
      return res.status(400).json({ errors });
    }
    next();
  };
}

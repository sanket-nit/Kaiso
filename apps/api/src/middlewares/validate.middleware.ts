import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
import { AppError } from "@repo/types";

export const validate = (schema: z.ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorDetails = error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      next(new AppError(400, "Validation failed", errorDetails));
    } else {
      next(new AppError(500, "Internal Server Error"));
    }
  }
};
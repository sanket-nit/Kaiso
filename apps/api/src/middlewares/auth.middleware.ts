import { AppError } from "@repo/types";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { env } from "../config";

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError(401, "Unauthorized. No token provided");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new AppError(401, "Unauthorized. No token provided");
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    if (typeof payload === "object" && payload != null && 'userId' in payload) {
      req.user = { userId: payload.userId };
      next();
    } else {
      throw new AppError(401, "Unauthorized: Invalid token format.")
    }
  } catch (error) {
    throw new AppError(401, "Unauthorized: Invalid token.");
  }

}

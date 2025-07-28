import express, { NextFunction, Request, Response, Express } from "express";
import authRouter from "./routes/auth.routes";
import { AppError } from "@repo/types";
const app: Express = express();

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: "ok",
    message:"API is up and running"
  })
})

app.use("/api/auth", authRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      errors: err.errors
    });
  }

  console.error(err); // Log unexpected errors
  return res.status(500).json({
    status: 'error',
    message: "Something went wrong",
  });
});

export default app;
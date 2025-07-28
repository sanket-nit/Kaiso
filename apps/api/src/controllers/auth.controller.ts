import { Request, Response } from "express";
import prisma from "@repo/db";
import { AppError } from "@repo/types";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { env } from "../config";

export const SignupHandler = async (req: Request, res: Response) => {
  const { username, email, password, name } = req.body;
  
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] }
  })

  if (existingUser) {
    throw new AppError(409, "A user with this username or email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      name
    }
  })

  res.status(201).send({
    message: "User created successfully",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  })
}


export const SigninHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const isPasswordValid = bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError(401, "Invalid email or password");
  }

  const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: "1d" });

  return res.send({
    message: "User logged in successfully",
    token
  })
}
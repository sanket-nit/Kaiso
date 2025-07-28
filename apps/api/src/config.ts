import dotenv from "dotenv";
import { z } from "zod"

dotenv.config();
const envSchema = z.object({
  PORT: z.string().default("3001"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
})

export const env = envSchema.parse(process.env)




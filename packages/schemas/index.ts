import { z } from "zod"


export const signupSchema = z.object({
  body: z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be less than 20 characters"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    email: z.email("A valid email is required"),
    name: z.string().optional()
  })
})

export const signinSchema = z.object({
  body: z.object({
    email: z.email("A valid email is required"),
    password: z.string().min(1, "Password is required")
  })
})

export type SignupBody = z.infer<typeof signupSchema>["body"];
export type SigninBody = z.infer<typeof signinSchema>["body"];
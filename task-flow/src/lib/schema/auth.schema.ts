import { z } from "zod"

export const signupSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
})

export const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export type SignupInput = z.infer<typeof signupSchema>
export type SigninInput = z.infer<typeof signinSchema>
import * as z from "zod"

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})


export const userAuthSignUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
  username: z.string(),
})


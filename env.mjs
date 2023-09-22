import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    // This is optional because it's only used in development.
    // See https://next-auth.js.org/deployment.
    NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.string().min(1),

    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    GITHUB_ACCESS_TOKEN: z.string().min(1),

    GOOGLE_CLIENT_ID:z.string().min(1),
    GOOGLE_CLIENT_SECRET:z.string().min(1),

    FACEBOOK_CLIENT_ID:z.string().min(1),
    FACEBOOK_CLIENT_SECRET:z.string().min(1),

    INSTAGRAM_CLIENT_ID:z.string().min(1),
    INSTAGRAM_CLIENT_SECRET:z.string().min(1),

    DATABASE_URL: z.string().min(1),
    // SMTP_FROM: z.string().min(1),
    POSTMARK_API_TOKEN: z.string().min(1),
    POSTMARK_SIGN_IN_TEMPLATE: z.string().min(1),
    POSTMARK_ACTIVATION_TEMPLATE: z.string().min(1),
    STRIPE_API_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    STRIPE_PRO_MONTHLY_PLAN_ID: z.string().min(1),
    EMAIL_SERVER_USER:z.string().min(1),
    EMAIL_SERVER_PASSWORD:z.string().min(1),
    EMAIL_SERVER_HOST:z.string().min(1),
    EMAIL_SERVER_PORT:z.string().min(1),
    EMAIL_FROM:z.string().min(1),
    AWS_ACCESS_KEY:z.string().min(1),
    AWS_SECRET_KEY:z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET:process.env.FACEBOOK_CLIENT_SECRET,

    INSTAGRAM_CLIENT_ID: process.env.INSTAGRAM_CLIENT_ID,
    INSTAGRAM_CLIENT_SECRET:process.env.INSTAGRAM_CLIENT_SECRET,

    DATABASE_URL: process.env.DATABASE_URL,
    // SMTP_FROM: process.env.SMTP_FROM,
    POSTMARK_API_TOKEN: process.env.POSTMARK_API_TOKEN,
    POSTMARK_SIGN_IN_TEMPLATE: process.env.POSTMARK_SIGN_IN_TEMPLATE,
    POSTMARK_ACTIVATION_TEMPLATE: process.env.POSTMARK_ACTIVATION_TEMPLATE,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_PRO_MONTHLY_PLAN_ID: process.env.STRIPE_PRO_MONTHLY_PLAN_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    EMAIL_SERVER_USER:process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD:process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_SERVER_HOST:process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT:process.env.EMAIL_SERVER_PORT,
    EMAIL_FROM:process.env.EMAIL_FROM,

    // S3
    AWS_ACCESS_KEY:process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY:process.env.AWS_SECRET_KEY,
  },
})

import { env } from "@/env.mjs"
import { createTransport, SentMessageInfo } from "nodemailer"
import { db } from "./db"
import { html, text } from "./mail"
export const server = {
    // host: process.env.EMAIL_SERVER_HOST,
    port: 587,
    service: 'gmail',
    secure: false, // true for 465, false for other ports
    auth: {
      user: env.EMAIL_SERVER_USER,
      pass: env.EMAIL_SERVER_PASSWORD
    }
  }

const from =  env.EMAIL_FROM

 export const sendActivationRequest = async ({ identifier, url, provider , theme  }) => {
    const user = await db.user.findUnique({
      where: {
        email: identifier,
      },
      select: {
        emailVerified: true,
      },
    })

    // user?.emailVerified ? SIGN IN TEMPLATE : ACTIVATION TEMPLATE
    const { host } = new URL(url)
    // NOTE: You are not required to use `nodemailer`, use whatever you want.
    const transport = createTransport(provider.server)
    const result:SentMessageInfo = await transport.sendMail({
      to: identifier,
      from: provider.from,
      subject: `Sign in to ${host}`,
      text: text({ url, host }),
      html: html({ url, host, theme }),
    })
  
    return result
  }
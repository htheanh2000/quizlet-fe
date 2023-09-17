import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { createTransport, SentMessageInfo } from "nodemailer"
import {html,text} from "@/lib/mail"
import { Client } from "postmark"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { db } from "@/lib/db"
import { compare, hash } from 'bcrypt'

export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      // Add this if you need access to the RefreshToken or AccessToken for a Google account 
      // you are not using a database to persist user accounts, this may be something you need to do.

      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code"
      //   }
      // }

    }),  
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        // host: process.env.EMAIL_SERVER_HOST,
        port: 587,
        service: 'gmail',
        secure: false, // true for 465, false for other ports
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD
        }
      },
      from: env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier, url, provider , theme  }) => {
        const user = await db.user.findUnique({
          where: {
            email: identifier,
          }
        })

        if(user) {
          throw new Error('User not found')
        }

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
      
        if (result.ErrorCode) {
          throw new Error(result.Message)
        }
      },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: "sign-in",
      name: "sign-in",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "TheAnhNe" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const dbUser = await db.user.findFirst({
          where: {
            email: email,
          },
        })
        
        if (dbUser && dbUser.password) {
          // Compare password
          const isValid = await compare(password, dbUser.password)
          if(!isValid) {
            throw new Error('Wrong credentials. Try again.')
          }
          // Return user due username and password is valid
          else {
            // Any object returned will be saved in `user` property of the JWT
            return {
              id: dbUser.id,
              name: dbUser.name,
              email: dbUser.email,
              picture: dbUser.image,
            }
          }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error('User does not exist . Try again.')
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: "sign-up",
      name: "sign-up",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "TheAnhNe" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password, username } = credentials as {
          email: string
          password: string
          username: string
        }
        const dbUser = await db.user.findFirst({
          where: {
            email: email,
          }
        })
        if (dbUser) {
          throw new Error('User exist. Try again.')
        } else {
          const dbUser = await db.user.create({
            data: {
              email: email,
              name: username,
              emailVerified: new Date(),
              password: await hash(password, 12)
            }
          })
          return {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            picture: dbUser.image,
          }
        }
      }
    })
  
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
}


"use client"

import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { UserAuthForm } from "@/components/user-auth-form"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"

// export const metadata: Metadata = {
//   title: "Login",
//   description: "Login to your account",
// }

export default function LoginPage() {
  const pathName = usePathname()
  return (
    <div className=" flex  flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 px-2 py-6 md:right-8 md:top-8"
        )}
      >
        <>
          <Icons.close className="h-8 w-8" />
        </>
      </Link>
      <div className=" flex w-full">
        <div className="hidden md:block">
          <Image
            width={200}
            height={160}
            sizes="100%"
            className="h-screen max-w-4xl w-full"
            src="/images/auth.png"
            alt="auth"
          />
          <h1 className="absolute left-16 top-16 text-5xl font-bold leading-normal text-gray-800">
            Smash sets in <br></br> your sweats.
          </h1>
          <h1 className="absolute bottom-16 left-16 text-5xl font-bold leading-normal text-white">
            Sophie
          </h1>
        </div>
        <div className="w-full max-w-3xl mx-auto px-8 2xl:px-20  pt-16  ">
          <div className="flex ">
            <Link
              href={"/sign-up"}
              className={cn(
                "text-3xl font-semibold text-gray-700 decoration-pink-600 decoration-wavy underline-offset-8 hover:underline",
                {
                  "text-black underline": pathName === "/sign-up",
                }
              )}
            >
              Sign up
            </Link>
            <Link
              href={"/login"}
              className={cn(
                "ml-12 text-3xl font-semibold text-gray-700 decoration-pink-600 decoration-wavy underline-offset-8 hover:underline",
                {
                  "text-black  underline": pathName === "/login",
                }
              )}
            >
              Log in
            </Link>
          </div>
          <div className="mt-16">
            <button
              type="button"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mb-4 w-full py-8"
              )}
            >
              <Icons.google className="h-8 w-8"></Icons.google>
              <p className="ml-4">Login with Google</p>
            </button>
            <button
              type="button"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mb-4 w-full py-8"
              )}
            >
              <Icons.facebook className="h-8 w-8"></Icons.facebook>
              <p className="ml-4">Login with Facebook</p>
            </button>
          </div>
          <div className="mt-4 flex w-full items-center justify-center">
            <div className="h-[1px] w-full bg-slate-300" />
            <p className="mx-4 whitespace-nowrap text-sm font-semibold uppercase text-slate-600">
              Or email
            </p>
            <div className="h-[1px] w-full bg-slate-300" />
          </div>

          <form>
            <div className="mt-8">
              <label>Email</label>
              <Input
                type="email"
                className="mt-2 h-14"
                placeholder="Type your email address or username"
              ></Input>
            </div>
            <div className="mt-6">
              <label>Password</label>
              <Input
                type="password"
                className="mt-2 h-14"
                placeholder="Type your password"
              ></Input>
            </div>
            <Link
              href="/reset-password"
              className="float-right mt-2 font-semibold text-cyan-500"
            >
              Forgot?
            </Link>
            <p className="mt-10 text-center text-sm font-light">
              By clicking Log in, you accept Quizlet's
              <Link
                href="/terms-of-service"
                className="font-semibold text-gray-600 mx-1"
              >
                Terms of Service
              </Link> 
              and
              <Link href="/privacy" className="font-semibold text-gray-600 mx-1">
                Privacy Policy
              </Link>
            </p>

            <Button
              className="mt-4 h-16 w-full bg-cyan-500 hover:bg-cyan-400"
              size="lg"
            >
              Log in
            </Button>
            <p className="mt-2 text-sm font-light">
              Remember to log out on shared devices
            </p>
            <Link
              href="/magic-link"
              className="float-right mt-2 font-semibold text-cyan-500"
            >
              Use magic link instead
            </Link>
            <div className="mt-16 p-0 m-0 h-16 w-full border-gray-200 border-2 flex items-center justify-center">
                New to Sophie ?{" "}
                <Link
                  href="/sign-up"
                  className="font-semibold ml-1 text-cyan-500"
                >
                  Create an account
                </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

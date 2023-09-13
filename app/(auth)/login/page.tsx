"use client"

import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { UserAuthForm } from "@/components/user-auth-form"
import Image from "next/image"
import { usePathname } from "next/navigation"

// export const metadata: Metadata = {
//   title: "Login",
//   description: "Login to your account",
// }

export default function LoginPage() {
  const pathName = usePathname()
  return (
    <div className=" flex h-screen w-screen flex-col items-center justify-center">
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
        <div>
          <Image
            width={200}
            height={160}
            sizes="100%"
            className="h-screen w-full"
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
        <div className="p-20 w-1/2">
          <div className="flex ">
            <Link
              href={"/sign-up"}
              className={cn("mx-2 text-2xl font-semibold hover:underline", {
                underline: pathName === "/sign-up",
              })}
            >
              Sign up
            </Link>
            <Link
              href={"/login"}
              className={cn("mx-2 text-2xl font-semibold hover:underline", {
                underline: pathName === "/login",
              })}
            >
              Log In
            </Link>
          </div>
          <div className="mt-8">
            <button
              type="button"
              className={cn(buttonVariants({ variant: "outline" }), "w-full py-6 mb-4")}
            >
              <Icons.google className="h-8 w-8"></Icons.google>
              <p className="ml-4">Login with Google</p>
            </button>
            <button
              type="button"
              className={cn(buttonVariants({ variant: "outline" }), "w-full py-6 mb-4")}
            >
              <Icons.facebook className="h-8 w-8"></Icons.facebook>
              <p className="ml-4">Login with Facebook</p>
            </button>
        </div>
        </div>
        
      </div>
    </div>
  )
}

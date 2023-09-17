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
import { UserSocialAuthForm } from "@/components/user-social-auth-form"

// export const metadata: Metadata = {
//   title: "Login",
//   description: "Login to your account",
// }

export default function LoginPage() {

  const pathName = usePathname()
  const navs = [{
    name: "Login",
    href: "/login",
  },{
    name:"Sign up",
    href: "/sign-up",
  }]
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
            className="h-screen w-full max-w-4xl"
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
        <div className="mx-auto w-full max-w-3xl px-8 pt-16  2xl:px-20  ">
        <div className="flex ">
            {navs.map((nav, index) => (
              <Link
                key={nav.name}
                href={nav.href}
                className={cn(
                  "mr-12 text-3xl font-semibold text-gray-700 decoration-pink-600 decoration-wavy underline-offset-8 hover:underline",
                  {
                    "text-black underline": pathName === nav.href,
                  }
                )}
              >
                {nav.name}
              </Link>
            ))}
          </div>
          <UserSocialAuthForm className="mt-16" />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or email
              </span>
            </div>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  )
}

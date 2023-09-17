"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import Link from "next/link"

interface UserSignUpProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserSignUpForm({ className, ...props }: UserSignUpProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGmailLoading, setIsGmailLoading] = React.useState<boolean>(false)
  const [isFacebookLoading, setIsFacebookLoading] =
    React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    // const signInResult = await signIn("email", {
    //   email: data.email.toLowerCase(),
    //   redirect: false,
    //   callbackUrl: searchParams?.get("from") || "/dashboard",
    // })
    console.log("sign-up on submission")

    const signInResult = await signIn("sign-in", {
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
    })
    console.log("signInResult", signInResult)
    setIsLoading(false)

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      })
    }

    return toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
 
    
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <Input
            id="email"
            type="email"
            className="mt-2 h-14"
            placeholder="Type your email address or username"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading || isGitHubLoading}
            {...register("email")}
          ></Input>
        </div>
        <div className="mt-6">
          <label>Password</label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            className="mt-2 h-14"
            placeholder="Type your password"
          ></Input>
        </div>
        <p className="mt-4 text-center text-sm font-light">
          By clicking Sign Up, you accept Sophie's
          <Link
            href="/terms-of-service"
            className="mx-1 font-semibold text-gray-600"
          >
            Terms of Service
          </Link>
          and
          <Link href="/privacy" className="mx-1 font-semibold text-gray-600">
            Privacy Policy
          </Link>
        </p>

        <Button
          className="mt-4 h-16 w-full bg-cyan-500 hover:bg-cyan-400"
          size="lg"
        >
          Sign Up
        </Button>
      </form>
      <Button
        variant="outline"
        className="flex h-16 w-full items-center justify-center border-2 border-gray-200 p-0"
      >
        <Link href="/sign-up" className="ml-1 font-semibold">
          Already have an account ? Log in
        </Link>
      </Button>
    </div>
  )
}

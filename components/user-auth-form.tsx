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

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
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
    console.log("signInResult", signInResult);
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
      <div className="mt-16">
        {/* Google sign in */}
        <button
          type="button"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "mb-4 w-full py-8"
          )}
          onClick={() => {
            setIsGmailLoading(true)
            signIn("google")
          }}
          disabled={isLoading || isGmailLoading}
        >
          {isGmailLoading ? (
            <Icons.spinner className="mr-2 h-8 w-8 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-8 w-8" />
          )}{" "}
          <p className="ml-4">Login with Google</p>
        </button>
        {/* Facebook sign in */}
        <button
          type="button"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "mb-4 w-full py-8"
          )}
          onClick={() => {
            setIsFacebookLoading(true)
            signIn("facebook")
          }}
          disabled={isLoading || isFacebookLoading}
        >
          {isFacebookLoading ? (
            <Icons.spinner className="mr-2 h-8 w-8 animate-spin" />
          ) : (
            <Icons.facebook className="mr-2 h-8 w-8" />
          )}{" "}
          <p className="ml-4">Login with Facebook</p>
        </button>
      </div>
      {/* Email sign in/ Magic link
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </form> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8">
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
        <div className="m-0 mt-16 flex h-16 w-full items-center justify-center border-2 border-gray-200 p-0">
          New to Sophie ?{" "}
          <Link href="/register" className="ml-1 font-semibold text-cyan-500">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  )
}

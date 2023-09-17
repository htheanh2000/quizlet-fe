"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userAuthSignUpSchema } from "@/lib/validations/auth"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import Link from "next/link"
import { useRouter } from 'next/navigation'
interface UserSignUpProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSignUpSchema>

export function UserSignUpForm({ className, ...props }: UserSignUpProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSignUpSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    const {email, password, confirmPassword, username} = data 
    if(!email || !password || !username || !confirmPassword) { 
      setIsLoading(false)
      return toast({
        title: "Please enter all required fields",
        variant: "destructive",
      })
    }

    if(password !== confirmPassword) { 
      setIsLoading(false)
      return toast({
        title: "Password do not match with Confirm password",
        variant: "destructive",
      })
    }

    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*_])[A-Za-z\d@#$%^&+=!*_]{8,}$/;

    if(!strongPasswordRegex.test(password)) {
      setIsLoading(false)
      return toast({
        title: "Password Error ",
        description: "uppercase letters, lowercase letters, digits, and special characters with a minimum length of 8 characters",
        variant: "destructive",
      })
    }

    const signUpResult = await signIn("sign-up", {
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: password,
      redirect: false,
    })

    if (!signUpResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: signUpResult?.error,
        variant: "destructive",
      })
    }

    toast({
      title: "Sign up successfully",
    })

    return router.push('/dashboard')
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
            disabled={isLoading }
            {...register("email")}
          ></Input>
        </div>
        <div className="mt-6">
          <label>User Name</label>
          <Input
            id="username"
            {...register("username")}
            className="mt-2 h-14"
            placeholder="Your name"
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
        <div className="mt-6">
          <label>Confirm Password</label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className="mt-2 h-14"
            placeholder="Confirm your password"
          ></Input>
        </div>
        <p className="mt-4 text-center text-sm font-light">
          By clicking Sign Up, you accept Sophie&apos;s
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
        <Link href="/sign-in" className="float-right mt-2 text-sm hover:underline">
          Already have an account ?
        </Link>
      </form>
      
     
    </div>
  )
}

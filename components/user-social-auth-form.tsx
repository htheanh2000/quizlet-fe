import * as React from "react"
import { signIn } from "next-auth/react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface UserSocialAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserSocialAuthForm({ className, ...props }: UserSocialAuthFormProps) {
  const [isGmailLoading, setIsGmailLoading] = React.useState<boolean>(false)
  const [isFacebookLoading, setIsFacebookLoading] =
  React.useState<boolean>(false)

  return (
    <div className={cn("grid gap-4", className)} {...props}>
        {/* Google sign in */}
        <button
          type="button"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full py-6"
          )}
          onClick={() => {
            setIsGmailLoading(true)
            signIn("google")
          }}
          disabled={isGmailLoading}
        >
          {isGmailLoading ? (
            <Icons.spinner className="mr-2 h-8 w-8 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-8 w-8" />
          )}{" "}
          <p className="ml-4 font-semibold">Login with Google</p>
        </button>
        {/* Facebook sign in */}
        <button
          type="button"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "mb-4 w-full py-6"
          )}
          onClick={() => {
            setIsFacebookLoading(true)
            signIn("facebook")
          }}
          disabled={isFacebookLoading}
        >
          {isFacebookLoading ? (
            <Icons.spinner className="mr-2 h-8 w-8 animate-spin" />
          ) : (
            <Icons.facebook className="mr-2 h-8 w-8" />
          )}{" "}
          <p className="ml-4 font-semibold">Login with Facebook</p>
        </button>
    </div>
  )
}

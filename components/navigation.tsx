import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { DocsSearch } from "@/components/search"

export function Navigation() {
  return (
    <div className="fixed z-100 w-screen bg-background shadow-sm">
      <div className="container ">
        <div className="flex h-20 items-center justify-between py-2">
          {/* <MainNav items={marketingConfig.mainNav} /> */}
          <DocsSearch
            className="mx-6 w-full"
            inputProps={{ placeholder: "Study sets,textbooks, questions" }}
          />
          <div className="flex max-w-max">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "mx-2 whitespace-nowrap px-4"
              )}
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "mx-2 whitespace-nowrap px-4"
              )}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

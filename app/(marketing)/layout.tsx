import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { DocsSearch } from "@/components/search"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-screen fixed bg-background shadow-sm z-100">
        <div className="container ">
          <div className="flex h-20 items-center justify-between py-2">
              <MainNav items={marketingConfig.mainNav} />
              <DocsSearch className="mx-6 w-full" inputProps={{placeholder:"Study sets,textbooks, questions"}} />
            <div className="flex max-w-max">
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "px-4 whitespace-nowrap mx-2"
                )}
              >
               Login
              </Link>
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "px-4 whitespace-nowrap mx-2"
                )}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}

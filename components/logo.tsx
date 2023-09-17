"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { HTMLAttributes } from "react"
import { siteConfig } from "@/config/site"

interface LogoProps extends HTMLAttributes<HTMLDivElement> {} 

export function Logo({ className, ...props }: LogoProps) {

  return (
    <div {...props} className={cn(className)}>
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        {/* <Icons.logo color="#4255ff"/> */}
        <span className="hidden text-2xl font-bold text-[#4255ff] sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  )
}

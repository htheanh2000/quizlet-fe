"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

interface DocsSearchProps {
  formProps?: React.HTMLAttributes<HTMLFormElement>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  className?: string; 
}


export function DocsSearch({ className,formProps,inputProps }: DocsSearchProps) {
  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()

    return toast({
      title: "Not implemented",
      description: "We're still working on the search.",
    })
  }
  console.log({
    className, inputProps,formProps
  });
  

  return (
    <form
      onSubmit={onSubmit}
      className={cn("relative w-full", className)}
      {...formProps}
    >
      <Input
        type="search"
        // placeholder="Search something..."
        className="h-10 w-full sm:min-w-64 sm:pr-12"
        {...inputProps}
      />
      <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-7 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </form>
  )
}

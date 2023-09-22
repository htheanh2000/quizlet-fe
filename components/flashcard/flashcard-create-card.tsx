import { FormEvent, HTMLAttributes, useCallback, useEffect, useRef, useState } from "react"
import Dropzone from "../upload/dropzone"
import { Input } from "../ui/input"
import { UploadImage } from "../upload/upload"
import { flashcardSchema } from "@/lib/validations/flashcard"
import { Flashcard } from "@prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"

interface PostItemProps extends HTMLAttributes<HTMLFormElement> {
  flashcard: Pick<Flashcard, "id" | "frontText" | "backText">
  index: number
}

type FormData = z.infer<typeof flashcardSchema>

export function FlashcardCreateCard({ flashcard , className, index}: PostItemProps) {
  const ref = useRef(null)
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(flashcardSchema),
  })

  return (
    <form
      ref={ref}
      // onSubmit={handleSubmit(onsubmit)}
      className={cn("w-full rounded border border-gray-500 p-8", className)}
    >
      <p className="m-0 p-0">{index + 1}</p>
      <div className="my-2 h-[1px] w-full bg-gray-500"></div>
      <div className="flex gap-4">
        <Input
          autoFocus
          placeholder="Front desciption"
          defaultValue={flashcard.frontText}
          {...register("frontText")}
        />
        <Input
          autoFocus
          placeholder="Back desciption"
          defaultValue={flashcard.backText}
          {...register("backText")}
        />
      </div>
      {/* <UploadImage /> */}
    </form>
  )
}

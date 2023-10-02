import {
  FormEvent,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import Dropzone from "../upload/dropzone"
import { Input } from "../ui/input"
import { UploadImage } from "../upload/upload"
import { flashcardSchema } from "@/lib/validations/flashcard"
import { Flashcard } from "@prisma/client"
import { useForm, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"

interface PostItemProps extends HTMLAttributes<HTMLFormElement> {
  flashcard: Pick<Flashcard, "id" | "frontText" | "backText">
  index: number
  setValue: UseFormSetValue<{ flashcards?: any }>
  register: UseFormRegister<{
    flashcards?: Flashcard[]
  }>
}
export function FlashcardCreateCard({
  flashcard,
  className,
  index,
  setValue,
  register,
}: PostItemProps) {
  useEffect(() => {
    setValue(`flashcards.${index}.id`, flashcard.id)
  }, [])
  return (
    <div className={cn("w-full rounded border border-gray-500 p-8", className)}>
      <p className="m-0 p-0">{index + 1}</p>
      <div className="my-2 h-[1px] w-full bg-gray-500"></div>
      <div className="flex gap-4">
        <Input
          autoFocus
          placeholder="Front desciption"
          defaultValue={flashcard.frontText}
          {...register(`flashcards.${index}.frontText`)}
        />
        <Input
          autoFocus
          placeholder="Back desciption"
          defaultValue={flashcard.backText}
          {...register(`flashcards.${index}.backText`)}
        />
      </div>
      {/* <UploadImage /> */}
    </div>
  )
}

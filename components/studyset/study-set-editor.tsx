"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Flashcard, Studyset } from "@prisma/client"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import * as z from "zod"
import "@/styles/editor.css"
import { cn } from "@/lib/utils"
import { studysetSchema } from "@/lib/validations/studyset"
import { Button, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { FlashcardCreateCard } from "../flashcard/flashcard-create-card"

interface StudysetEditorProps {
  studyset: Pick<Studyset, "id" | "title" | "description">
  flashcards: Pick<Flashcard, "id" | "frontText" | "backText">[]
}

type FormData = z.infer<typeof studysetSchema>

export function StudysetEditor({ studyset, flashcards }: StudysetEditorProps) {
  const { register, handleSubmit, setValue , reset} = useForm<FormData>({
    resolver: zodResolver(studysetSchema),
  })
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [isCreateFlashCard, setIsCreateFlashCard] =
    React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/studysets/${studyset.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
    console.log("data", data)

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your studyset was not saved. Please try again.",
        variant: "destructive",
      })
    }

    router.refresh()

    return toast({
      description: "Your study set has been saved.",
    })
  }

  const createFlashCard = async () => {
    setIsCreateFlashCard(true)
    const response = await fetch(`/api/flashcards`, {
      method: "POST",
      body: JSON.stringify({
        studysetId: studyset.id,
      }),
    })
    setIsCreateFlashCard(false)
    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Can not create flashcard. Please try again.",
        variant: "destructive",
      })
    }
    const responseBody = (await response.json())
    flashcards.push({
      id: responseBody.id,
      frontText: "",
      backText: ""
    })

    console.log("flashcards", flashcards);
    reset()
    router.refresh()
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full gap-10">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-10">
              <Link
                href="/study-set"
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                <>
                  <Icons.chevronLeft className="mr-2 h-4 w-4" />
                  Back
                </>
              </Link>
            </div>
            <button type="submit" className={cn(buttonVariants())}>
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Save</span>
            </button>
          </div>
          <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
            <TextareaAutosize
              autoFocus
              id="title"
              defaultValue={studyset.title}
              placeholder="studyset title"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
              {...register("title")}
            />

            <TextareaAutosize
              autoFocus
              id="title"
              defaultValue={studyset.description || ""}
              placeholder="studyset description"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-xl font-semibold focus:outline-none"
              {...register("description")}
            />
            {flashcards.map((flashcard, index) => {
              return (
                <FlashcardCreateCard
                  className="mb-4"
                  key={flashcard.id}
                  index={index}
                  flashcard={flashcard}
                  register={register}
                  setValue={setValue}
                />
              )
            })}

            {/* Set type="button" to change that. type="submit" is the default */}
            <Button
              type="button"
              onClick={createFlashCard}
              className="float-right mt-4"
              variant={"outline"}
            >
              {isCreateFlashCard && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add 1 card
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

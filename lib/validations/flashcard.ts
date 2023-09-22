import * as z from "zod"

export const flashcardSchema = z.object({
  studysetId: z.string(),
  frontText: z.string().optional(),
  backText: z.string().optional(),
})
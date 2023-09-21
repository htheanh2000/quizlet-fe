import * as z from "zod"

export const studysetSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  description: z.any().optional(),
  flashcards: z.any().optional(),
})

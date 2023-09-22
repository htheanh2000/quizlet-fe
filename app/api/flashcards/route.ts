import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { flashcardSchema } from "@/lib/validations/flashcard"
 
export async function POST(req: Request) {
  try {

    // === Authentication === 
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }
    // === End Authentication === 

    const json = await req.json()
    const body  = flashcardSchema.parse(json)
    const flashcard = await db.flashcard.create({
      data: {
        studysetId: body.studysetId,
        frontText: body.frontText || '',
        backText: body.backText || '',
      },
      select: {
        id: true,
      },
    })
    return new Response(JSON.stringify(flashcard))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(error, { status: 500 })
  }
}

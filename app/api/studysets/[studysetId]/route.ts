import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { studysetSchema } from "@/lib/validations/studyset"

const routeContextSchema = z.object({
  params: z.object({
    studysetId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this studyset.
    if (!(await verifyCurrentUserHasAccessToStudyset(params.studysetId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the studyset.
    await db.studyset.delete({
      where: {
        id: params.studysetId as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this studyset.
    if (!(await verifyCurrentUserHasAccessToStudyset(params.studysetId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = studysetSchema.parse(json)

    // Update the studyset.
    // TODO: Implement sanitization for content.
    await db.studyset.update({
      where: {
        id: params.studysetId,
      },
      data: {
        title: body.title,
        description: body.description,
        flashcards: body.flashcards
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToStudyset(studysetId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.studyset.count({
    where: {
      id: studysetId,
      authorId: session?.user.id,
    },
  })

  

  return count > 0
}

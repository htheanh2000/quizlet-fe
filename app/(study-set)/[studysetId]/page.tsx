import { notFound, redirect } from "next/navigation"
import { Studyset, User } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Editor } from "@/components/post/editor"
import { StudysetEditor } from "@/components/studyset/study-set-editor"

async function getstudysetForUser(studysetId: Studyset["id"], userId: User["id"]) {
  return await db.studyset.findFirst({
    where: {
      id: studysetId,
      authorId: userId,
    },
  })
}

interface EditorPageProps {
  params: { studysetId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const studyset = await getstudysetForUser(params.studysetId, user.id)

  if (!studyset) {
    notFound()
  }

  return (
    <div>
        <p>id: {studyset.id}</p>
        <p>authorId: {studyset.authorId}</p>
        <StudysetEditor studyset={studyset} />
    </div>
  )
}

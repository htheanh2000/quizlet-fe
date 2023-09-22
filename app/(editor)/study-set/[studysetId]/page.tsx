import { notFound, redirect } from "next/navigation"
import { Studyset, User } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { StudysetEditor } from "@/components/studyset/study-set-editor"

async function getstudysetForUser(studysetId: Studyset["id"], userId: User["id"]) {
  return await db.studyset.findFirst({
    where: {
      id: studysetId,
      authorId: userId,
    },
    include: {
      flashcards: {
        orderBy: {
          // TODO: order by order property
          createdAt: 'desc',
        }
      }
    }
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

  console.log("studyset", studyset);
  
  if (!studyset) {
    notFound()
  }

  return (
    <div>
        <StudysetEditor studyset={studyset} flashcards={studyset.flashcards} />
    </div>
  )
}

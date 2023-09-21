import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { StudySetCreateButton } from "@/components/studyset/study-set-create-button"
import { StudysetItem } from "@/components/studyset/study-set-item"

export const metadata = {
  title: "Study Set",
}

export default async function StudysetPage() {
  const user = await getCurrentUser()

  // Protect role
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const studysets = await db.studyset.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
    // orderBy: {
    //   updatedAt: "desc",
    // },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Flashcards" text="Create and manage your flashcard.">
        <StudySetCreateButton />
      </DashboardHeader>
      <div>
        {studysets?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {studysets.map((studyset) => (
              <StudysetItem key={studyset.id} studyset={studyset} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No set created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any set yet. Start a new set.
            </EmptyPlaceholder.Description>
            <StudySetCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}

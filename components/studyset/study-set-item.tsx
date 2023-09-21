import Link from "next/link"
import { Studyset } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { StudysetOperations } from "./study-set-operations"

interface StudysetItemProps {
  studyset: Pick<Studyset, "id" | "title" | "createdAt">
}

export function StudysetItem({ studyset }: StudysetItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/study-set/${studyset.id}`}
          className="font-semibold hover:underline"
        >
          {studyset.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(studyset.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <StudysetOperations studyset={{ id: studyset.id, title: studyset.title }} />
    </div>
  )
}

StudysetItem.Skeleton = function StudysetItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}

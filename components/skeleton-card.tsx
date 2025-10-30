import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <Card className="overflow-hidden animate-pulse">
      <CardHeader className="p-0">
        <Skeleton className="aspect-video w-full bg-muted animate-shimmer" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <Skeleton className="h-5 w-20 bg-muted" />
          <Skeleton className="h-4 w-24 bg-muted" />
        </div>
        <Skeleton className="mb-2 h-6 w-full bg-muted" />
        <Skeleton className="h-6 w-3/4 bg-muted" />
        <div className="mt-3 space-y-2">
          <Skeleton className="h-4 w-full bg-muted" />
          <Skeleton className="h-4 w-full bg-muted" />
          <Skeleton className="h-4 w-2/3 bg-muted" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-4 w-24 bg-muted" />
      </CardFooter>
    </Card>
  )
}

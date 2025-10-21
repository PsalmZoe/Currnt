import { Loader2 } from "lucide-react"

interface LoaderProps {
  message?: string
}

export function Loader({ message = "Loading articles..." }: LoaderProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center animate-in fade-in duration-300">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <div className="absolute inset-0 h-10 w-10 animate-ping rounded-full bg-primary/20" />
        </div>
        <p className="text-sm text-muted-foreground animate-pulse-subtle">{message}</p>
      </div>
    </div>
  )
}

import { NextResponse, type NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/ssr"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res }, { isEdge: true })

  await supabase.auth.getUser()

  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
  runtime: "edge",
}

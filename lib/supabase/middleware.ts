import { NextResponse, type NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/ssr"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // ✅ Edge-compatible Supabase client
  const supabase = createMiddlewareClient(
    { req, res },
    { isEdge: true } // ensure it runs in the Edge runtime
  )

  // Optional: check user session
  await supabase.auth.getUser()

  return res
}

// ✅ Explicitly mark this as an Edge function
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
  runtime: "edge",
}

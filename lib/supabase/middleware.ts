import { NextResponse, type NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/ssr"

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next()

    const supabase = createMiddlewareClient(
      { req, res },
      { isEdge: true } // ✅ ensure edge-compatible mode
    )

    // Attempt to refresh / verify session
    await supabase.auth.getUser()

    return res
  } catch (err) {
    console.error("Middleware error:", err)
    return NextResponse.next() // avoid 500s by falling back
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
  runtime: "edge",
}

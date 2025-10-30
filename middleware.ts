import { NextResponse, type NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/ssr"

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next()

    const supabase = createMiddlewareClient(
      { req, res },
      { isEdge: true } // ✅ Edge-compatible
    )

    // Optional: check user session
    await supabase.auth.getUser()

    return res
  } catch (err) {
    console.error("Middleware error:", err)
    return NextResponse.next() // fallback to avoid 500
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
  runtime: "edge", // make explicit
}

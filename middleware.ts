// middleware.ts
import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next()

    // Use createServerClient instead of createMiddlewareClient
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: req.cookies, // minimal Edge-compatible cookie handling
      }
    )

    // Optional: check user session
    await supabase.auth.getUser()

    return res
  } catch (err) {
    console.error("Middleware error:", err)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
  runtime: "experimental-edge", // required for Next.js Edge runtime
}

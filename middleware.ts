import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () =>
            req.cookies.getAll().map((c) => ({ name: c.name, value: c.value })),
          setAll: () => {}, // no-op for Edge
        },
      }
    )

    // ✅ Edge-compatible session check
    const { data: { user }, error } = await supabase.auth.getSession()
    if (error) console.error("Supabase getSession error:", error)
    console.log("User:", user)
  } catch (err) {
    console.error("Middleware runtime error:", err)
  }

  return res
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
  runtime: "experimental-edge",
}

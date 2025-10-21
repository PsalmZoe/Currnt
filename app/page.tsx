import { redirect } from "next/navigation"

export default function RootPage() {
  // Redirect to home page which has the full layout with sidebars
  redirect("/home")
}

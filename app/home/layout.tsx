import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col lg:ml-64 ml-16 transition-all duration-300">
        <TopBar />

        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto transition-all duration-300">{children}</main>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const trendingTopics = [
  { id: 1, name: "Elections", count: "2.5k" },
  { id: 2, name: "Policoats", count: "1.8k" },
  { id: 3, name: "Dukotrs", count: "1.2k" },
  { id: 4, name: "Cloea", count: "980" },
  { id: 5, name: "Political", count: "756" },
  { id: 6, name: "Deschar", count: "654" },
]

export function RightSidebar() {
  const [settings, setSettings] = useState({
    notifications: true,
    autoRefresh: false,
    darkMode: false,
  })

  return (
    <aside className="hidden xl:block fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 border-l bg-background p-6 overflow-y-auto">
      {/* Trending Topics */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[#3B82F6]" />
          <h2 className="text-lg font-bold">Trending Topics</h2>
        </div>
        <div className="space-y-3">
          {trendingTopics.map((topic) => (
            <div key={topic.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{topic.id}-</span>
                <span className="text-sm font-medium">{topic.name}</span>
              </div>
              <Switch checked={topic.id === 6} className="data-[state=checked]:bg-[#3B82F6]" />
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div>
        <h2 className="mb-4 text-lg font-bold">Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="text-sm font-medium">
              Notifications
            </Label>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked) => setSettings((s) => ({ ...s, notifications: checked }))}
              className="data-[state=checked]:bg-[#3B82F6]"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-refresh" className="text-sm font-medium">
              Auto Refresh
            </Label>
            <Switch
              id="auto-refresh"
              checked={settings.autoRefresh}
              onCheckedChange={(checked) => setSettings((s) => ({ ...s, autoRefresh: checked }))}
              className="data-[state=checked]:bg-[#3B82F6]"
            />
          </div>
        </div>
      </div>
    </aside>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "@/contexts/theme-context"
import { useSettings } from "@/contexts/settings-context"
import { SettingsIcon, Bell, Moon, Type, Layout, Grid3x3, List, RefreshCw, Database, Clock, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { requestNotificationPermission } from "@/lib/notifications"

export default function SettingsPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const {
    fontSize,
    setFontSize,
    readingMode,
    setReadingMode,
    viewMode,
    setViewMode,
    autoRefresh,
    setAutoRefresh,
    autoRefreshInterval,
    setAutoRefreshInterval,
    dataSavingMode,
    setDataSavingMode,
    showReadingTime,
    setShowReadingTime,
    clearCache,
  } = useSettings()
  const { toast } = useToast()
  const [notifications, setNotifications] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("newsapp_notifications")
      if (stored) {
        setNotifications(JSON.parse(stored))
      }
    } catch (err) {
      console.error("Error accessing localStorage:", err)
    }
  }, [])

  const handleNotificationToggle = async (checked: boolean) => {
    if (checked) {
      const granted = await requestNotificationPermission()
      if (granted) {
        setNotifications(true)
        try {
          localStorage.setItem("newsapp_notifications", JSON.stringify(true))
        } catch (err) {
          console.error("Error saving to localStorage:", err)
        }
        toast({
          title: "Notifications enabled",
          description: "You'll receive updates about breaking news",
        })
      } else {
        toast({
          title: "Permission denied",
          description: "Please enable notifications in your browser settings",
          variant: "destructive",
        })
      }
    } else {
      setNotifications(false)
      try {
        localStorage.setItem("newsapp_notifications", JSON.stringify(false))
      } catch (err) {
        console.error("Error saving to localStorage:", err)
      }
      toast({
        title: "Notifications disabled",
        description: "You won't receive notifications",
      })
    }
  }

  const handleClearCache = () => {
    clearCache()
    toast({
      title: "Cache cleared",
      description: "All cached data has been removed",
    })
  }

  const intervalMinutes = autoRefreshInterval / 60000

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Please log in to access settings</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-8 w-8" />
            <h1 className="text-balance text-4xl font-bold tracking-tight">Settings</h1>
          </div>

          {/* Appearance Settings */}
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how NewsHub looks on your device</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Toggle dark mode theme</p>
                  </div>
                </div>
                <Switch id="dark-mode" checked={theme === "dark"} onCheckedChange={toggleTheme} />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4 text-muted-foreground" />
                  <Label>Font Size</Label>
                </div>
                <Select value={fontSize} onValueChange={(value) => setFontSize(value as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Layout className="h-4 w-4 text-muted-foreground" />
                  <Label>Reading Mode</Label>
                </div>
                <Select value={readingMode} onValueChange={(value) => setReadingMode(value as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {viewMode === "grid" ? (
                    <Grid3x3 className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <List className="h-4 w-4 text-muted-foreground" />
                  )}
                  <Label>View Mode</Label>
                </div>
                <Select value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid View</SelectItem>
                    <SelectItem value="list">List View</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about breaking news</p>
                  </div>
                </div>
                <Switch id="notifications" checked={notifications} onCheckedChange={handleNotificationToggle} />
              </div>
            </CardContent>
          </Card>

          {/* Reading Preferences */}
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Reading Preferences</CardTitle>
              <CardDescription>Customize your reading experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label htmlFor="reading-time">Show Reading Time</Label>
                    <p className="text-sm text-muted-foreground">Display estimated reading time for articles</p>
                  </div>
                </div>
                <Switch id="reading-time" checked={showReadingTime} onCheckedChange={setShowReadingTime} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-refresh">Auto Refresh</Label>
                    <p className="text-sm text-muted-foreground">Automatically refresh news feed</p>
                  </div>
                </div>
                <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
              </div>

              {autoRefresh && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                  <Label>Refresh Interval: {intervalMinutes} minutes</Label>
                  <Slider
                    value={[intervalMinutes]}
                    onValueChange={([value]) => setAutoRefreshInterval(value * 60000)}
                    min={1}
                    max={30}
                    step={1}
                    className="w-full"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Data & Storage */}
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Data & Storage</CardTitle>
              <CardDescription>Manage your data usage and storage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label htmlFor="data-saving">Data Saving Mode</Label>
                    <p className="text-sm text-muted-foreground">Load lower quality images to save data</p>
                  </div>
                </div>
                <Switch id="data-saving" checked={dataSavingMode} onCheckedChange={setDataSavingMode} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label>Clear Cache</Label>
                    <p className="text-sm text-muted-foreground">Remove all cached data</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleClearCache}>
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

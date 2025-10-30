export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.log("[v0] This browser does not support notifications")
    return false
  }

  if (Notification.permission === "granted") {
    return true
  }

  if (Notification.permission !== "denied") {
    try {
      const permission = await Notification.requestPermission()
      return permission === "granted"
    } catch (error) {
      console.error("[v0] Error requesting notification permission:", error)
      return false
    }
  }

  return false
}

export function sendNotification(title: string, options?: NotificationOptions) {
  if (!("Notification" in window)) {
    console.log("[v0] Notifications not supported")
    return
  }

  if (Notification.permission === "granted") {
    try {
      const notification = new Notification(title, {
        icon: "/logo-blue.png",
        badge: "/logo-blue.png",
        ...options,
      })

      if (options?.tag === "breaking-news") {
        notification.onclick = () => {
          window.focus()
          if (options.data?.url) {
            window.location.href = `/article?data=${encodeURIComponent(JSON.stringify(options.data))}`
          }
        }
      }

      return notification
    } catch (error) {
      console.error("[v0] Error sending notification:", error)
    }
  }
}

export function sendBreakingNewsNotification(article: {
  title: string
  description?: string
  image?: string
  url?: string
  author?: string
  source?: string
  publishedAt?: string
}) {
  const notificationsEnabled = localStorage.getItem("newsapp_notifications") === "true"
  if (!notificationsEnabled) {
    return
  }

  sendNotification(article.title, {
    body: article.description || "New breaking news available",
    icon: article.image || "/logo-blue.png",
    badge: "/logo-blue.png",
    tag: "breaking-news",
    requireInteraction: true,
    data: {
      url: article.url,
      title: article.title,
      description: article.description,
      image: article.image,
      author: article.author,
      source: article.source,
      publishedAt: article.publishedAt,
    },
  })
}

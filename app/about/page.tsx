import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Newspaper, Heart, Zap, Shield } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: Newspaper,
      title: "Latest News",
      description: "Access breaking news and headlines from trusted sources around the world",
    },
    {
      icon: Heart,
      title: "Save Favorites",
      description: "Bookmark articles you love and access them anytime from your favorites",
    },
    {
      icon: Zap,
      title: "Fast & Responsive",
      description: "Lightning-fast performance with a beautiful, modern interface",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays on your device. We respect your privacy",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="space-y-4 text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">About NewsHub</h1>
            <p className="text-pretty text-lg text-muted-foreground">
              Your gateway to staying informed with the latest news from around the world
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                NewsHub is designed to help you stay informed with the latest news and headlines from trusted sources
                worldwide. We believe in making news accessible, fast, and enjoyable to read.
              </p>
              <p>
                Built with modern web technologies, NewsHub provides a seamless reading experience across all your
                devices. Whether you're catching up on breaking news or diving deep into your favorite topics, we've got
                you covered.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Powered by NewsAPI</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                NewsHub uses NewsAPI to deliver real-time news from over 80,000 sources worldwide. We aggregate content
                from major news outlets, blogs, and publications to bring you comprehensive coverage of current events.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

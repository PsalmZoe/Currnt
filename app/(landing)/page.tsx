"use client"

export const dynamic = "force-dynamic"

import Link from "next/link"
import { ArrowRight, Newspaper, Sparkles, Heart, TrendingUp, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  const features = [
    {
      icon: Newspaper,
      title: "Latest News",
      description: "Stay updated with breaking news from trusted sources worldwide",
    },
    {
      icon: Sparkles,
      title: "Personalized Feed",
      description: "Get news tailored to your interests and reading preferences",
    },
    {
      icon: Heart,
      title: "Save Favorites",
      description: "Bookmark articles to read later and build your personal library",
    },
    {
      icon: TrendingUp,
      title: "Trending Topics",
      description: "Discover what's trending and stay ahead of the conversation",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Receive instant notifications for breaking news and updates",
    },
    {
      icon: Shield,
      title: "Trusted Sources",
      description: "Access news from verified and reputable publishers only",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Newspaper className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">NewsHub</span>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/home">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight lg:text-6xl">
            Your Gateway to
            <span className="text-primary"> World News</span>
          </h1>
          <p className="mt-6 text-pretty text-lg text-muted-foreground lg:text-xl">
            Stay informed with real-time news from around the globe. Personalized, curated, and delivered just for you.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/home">
                Start Reading
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-balance text-center text-3xl font-bold lg:text-4xl">
            Everything you need to stay informed
          </h2>
          <p className="mt-4 text-center text-muted-foreground">
            Powerful features to enhance your news reading experience
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="group transition-all hover:shadow-lg animate-fade-in">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl rounded-2xl bg-primary p-12 text-center">
          <h2 className="text-balance text-3xl font-bold text-primary-foreground lg:text-4xl">Ready to get started?</h2>
          <p className="mt-4 text-lg text-primary-foreground/90">
            Join thousands of readers staying informed with NewsHub
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8 gap-2">
            <Link href="/signup">
              Create Free Account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 NewsHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

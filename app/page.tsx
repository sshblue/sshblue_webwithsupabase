import { createClient } from "@/utils/supabase/server"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Terminal, Server, Shield, Zap, Copy, CheckCircle2, ArrowRight, Code2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"
import React from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cpu, HardDrive, Gauge, Globe, HeartPulse } from "lucide-react"
import { Marquee } from "@/components/ui/marquee"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { ShinyButton } from "@/components/ui/shiny-button"
import { Terminal as NewTerminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal"
import { DotPattern } from "@/components/ui/dot-pattern"

const features = [
  {
    title: "Robust Infrastructure",
    description: "High-performance servers with 99.9% uptime",
    icon: Server,
  },
  {
    title: "Fast Deployment",
    description: "Deploy in minutes with our CLI",
    icon: Terminal,
  },
  {
    title: "Maximum Security",
    description: "End-to-end encryption and DDoS protection",
    icon: Shield,
  },
]

const deployCommands = [
  "# Install our CLI",
  "npm install -g sshblue-cli",
  "",
  "# Log in to your account",
  "sshblue login",
  "",
  "# Deploy your first server",
  "sshblue deploy --type vps --region eu-west",
]

export default async function Home() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("price_per_month", { ascending: true })

  const serverTypes = ["VPS", "Cloud", "Dedicated"]

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 relative overflow-hidden">
        <DotPattern 
          className="absolute inset-0 opacity-20 dark:opacity-30" 
          width={32} 
          height={32} 
        />
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center relative">
          <Badge className="rounded-lg px-3 py-1 relative bg-background/95 backdrop-blur-sm shadow-lg">
            <span className="flex items-center gap-2">
              <Code2 className="h-3 w-3" />
              <span className="text-sm">New: Support for Python 3.12</span>
            </span>
          </Badge>
          
          <div className="relative">
            <div className="absolute -inset-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-[100px] -z-10 animate-pulse" />
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl relative">
              ssh<span className="text-primary relative">
                <div className="absolute inset-0 bg-blue-500/50 blur-2xl -z-10" />
                blue
              </span>
            </h1>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-10 bg-blue-500/40 blur-[50px] -z-10 animate-pulse" />
            <p className="text-xl text-muted-foreground relative backdrop-blur-sm">
              Secure Services & Hosting
            </p>
          </div>
          
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            The best solution for your server needs, powered by sshblue
          </p>
          
          <div className="flex flex-col gap-2 min-[400px]:flex-row relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl -z-10" />
            <Link href="#servers">
              <ShinyButton 
                className="backdrop-blur-sm bg-background/95 text-sm relative px-4 py-2"
              >
                View our offers
              </ShinyButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Terminal Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-3xl font-bold tracking-tighter">
              Deploy with 1 command in your terminal
            </h2>
            <NewTerminal className="w-full max-w-2xl">
              <div className="space-y-4 font-mono text-sm">
                <div>
                  <span className="text-red-400"># Install our CLI</span>
                  <br />
                  <TypingAnimation delay={1000} duration={50}>
                    npm install -g sshblue-cli
                  </TypingAnimation>
                </div>

                <div>
                  <span className="text-red-400"># Log in to your account</span>
                  <br />
                  <TypingAnimation delay={2500} duration={50}>
                    sshblue login
                  </TypingAnimation>
                </div>

                <div>
                  <span className="text-red-400"># Deploy your first server</span>
                  <br />
                  <TypingAnimation delay={4000} duration={50}>
                    sshblue deploy --type vps --region eu-west
                  </TypingAnimation>
                  <br /> <br />
                  <AnimatedSpan delay={5500} className="text-green-500">
                    ✓ Server deployed successfully!
                  </AnimatedSpan>
                </div>
              </div>
            </NewTerminal>          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-accent/20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Server className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Robust Infrastructure</h3>
              <p className="text-muted-foreground">
                High-performance servers with 99.9% uptime
              </p>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Terminal className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Deployment</h3>
              <p className="text-muted-foreground">
                Get started in minutes with our CLI
              </p>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Maximum Security</h3>
              <p className="text-muted-foreground">
                End-to-end encryption and DDoS protection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="servers" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Our Servers
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Choose the server that fits your needs
              </p>
            </div>
          </div>

          <Tabs defaultValue="VPS" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              {serverTypes.map((type) => (
                <TabsTrigger key={type} value={type}>
                  {type}
                </TabsTrigger>
              ))}
            </TabsList>
            {serverTypes.map((type) => (
              <TabsContent key={type} value={type}>
                <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
                  {products?.filter(p => p.server_type === type).map((product) => (
                    <Card key={product.id} className="flex flex-col p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.description}</p>
                        </div>
                        <Badge variant="secondary">{product.server_type}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 my-4">
                        <div className="flex items-center gap-2">
                          <Cpu className="h-4 w-4 text-muted-foreground" />
                          <span>{product.cpu_cores} vCPU</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Gauge className="h-4 w-4 text-muted-foreground" />
                          <span>{product.ram_gb} Go RAM</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HardDrive className="h-4 w-4 text-muted-foreground" />
                          <span>{product.storage_gb} Go SSD</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span>{product.bandwidth_tb} TB/month</span>
                        </div>
                      </div>

                      <div className="flex gap-1 my-4">
                        <Badge variant="outline" className="gap-1 text-xs px-2 py-0">
                          <Server className="h-3 w-3" /> Backup included
                        </Badge>
                        <Badge variant="outline" className="gap-1 text-xs px-2 py-0">
                          <Shield className="h-3 w-3" /> DDoS Protection
                        </Badge>
                        <Badge variant="outline" className="gap-1 text-xs px-2 py-0">
                          <HeartPulse className="h-3 w-3" /> 24/7 Support
                        </Badge>
                      </div>

                      <div className="mt-auto pt-4 border-t">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-3xl font-bold">{product.price_per_month}€</span>
                            <span className="text-muted-foreground">/month</span>
                          </div>
                          <Link href="/sign-up">
                            <Button>Order</Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-12 bg-accent/10">
        <div className="container mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-2 text-muted-foreground">
            Join hundreds of satisfied developers and businesses
          </p>
        </div>
        
        <Marquee className="py-6" pauseOnHover speed={50}>
          <div className="flex gap-8 px-4">
            {[
              {
                text: "Tested many servers. Blazing fast!",
                author: "Geraven",
                role: "Independent Dev"
              },
              {
                text: "With 100 sites, uptime is key. Always reliable.",
                author: "jennya_sys",
                role: "Website Admin"
              },
              {
                text: "Quick, smart support. They deliver every time.",
                author: "hakuyahama",
                role: "System Admin"
              },
              {
                text: "Auto deployment is a game changer. Efficient and simple.",
                author: "Reborn03",
                role: "Freelance Dev"
              },
              {
                text: "Rock-solid security and fast network. Top-tier choice!",
                author: "xoCamy",
                role: "Security Admin"
              }
              
            ].map((review, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 p-6 min-w-[300px] bg-background rounded-xl shadow-sm"
              >
                <p className="text-sm text-muted-foreground italic">"{review.text}"</p>
                <div>
                  <p className="font-semibold">{review.author}</p>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-background">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-muted-foreground">
                &copy; 2024 sshblue. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms</Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
              <Link 
                href="https://t.me/sshblue" 
                target="_blank"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span className="underline">@sshblue</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

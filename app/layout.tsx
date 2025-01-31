import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "next-themes"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "sshblue",
  description: "Secure Services & Hosting",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={GeistSans.className}>
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}

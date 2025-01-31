"use client"

import { MainNav } from "@/components/main-nav"
import { UserCard } from "@/components/user-card"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import Link from "next/link"

export function Header() {
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)

      // Listen for authentication changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null)
      })

      return () => subscription.unsubscribe()
    }

    getUser()
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-semibold">sshblue</span>
        </Link>
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeSwitcher />
          {loading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
          ) : user ? (
            <UserCard 
              email={user.email} 
              createdAt={user.created_at} 
            />
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button variant="ghost">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button>
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

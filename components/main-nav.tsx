"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { 
  Server, 
  Cloud,
  Shield,
  Boxes,
  ChevronDown,
  LayoutDashboard,
  HardDrive, 
  Cpu, 
  LifeBuoy,
  BookOpen,
  HelpCircle,
  Home
} from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"

export function MainNav() {
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
    }
    checkAuth()
  }, [])

  return (
    <div className="flex items-center gap-2">
      <Link href="/">
        <Button variant="ghost" className="flex items-center gap-2">
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Button>
      </Link>

      {isAuthenticated && (
        <Link href="/user_dashboard">
          <Button variant="ghost" className="flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Button>
        </Link>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <Boxes className="w-4 h-4" />
            <span>Servers</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="flex items-center gap-2">
            <Server className="w-4 h-4" />
            VPS
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/products?type=vps-starter">
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <Cpu className="w-4 h-4" />
              <div className="flex flex-col">
                <span>Starter VPS</span>
                <span className="text-xs text-muted-foreground">
                  Ideal for development projects
                </span>
              </div>
            </DropdownMenuItem>
          </Link>
          <Link href="/products?type=vps-business">
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <HardDrive className="w-4 h-4" />
              <div className="flex flex-col">
                <span>Business VPS</span>
                <span className="text-xs text-muted-foreground">
                  For production applications
                </span>
              </div>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex items-center gap-2">
            <Server className="w-4 h-4" />
            Dedicated Servers
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/products?type=dedicated-pro">
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <Server className="w-4 h-4" />
              <div className="flex flex-col">
                <span>Pro Dedicated</span>
                <span className="text-xs text-muted-foreground">
                  High-performance dedicated server
                </span>
              </div>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <LifeBuoy className="w-4 h-4" />
            <span>Support</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <Link href="/docs/getting-started">
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <BookOpen className="w-4 h-4" />
              <div className="flex flex-col">
                <span>Documentation</span>
                <span className="text-xs text-muted-foreground">
                  Guides and tutorials to get started
                </span>
              </div>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <Link href="/support">
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
              <div className="flex flex-col">
                <span>Technical Support</span>
                <span className="text-xs text-muted-foreground">
                  24/7 assistance for your servers
                </span>
              </div>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

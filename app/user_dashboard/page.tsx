"use client"

import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Cpu,
  HardDrive,
  Gauge,
  Globe,
  Server,
  Shield,
  HeartPulse,
  Search,
  Power,
  RefreshCw,
  Terminal,
  MoreVertical,
  Activity,
  Wallet,
  Box
} from "lucide-react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

export default function UserDashboard() {
  const [servers, setServers] = useState<any[]>([])
  const [filteredServers, setFilteredServers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    const fetchServers = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push("/login")
        return
      }

      const { data: purchases } = await supabase
        .from("purchases")
        .select(`
          *,
          products (
            name,
            description,
            server_type
          )
        `)
        .order("created_at", { ascending: false })

      if (purchases) {
        setServers(purchases)
        setFilteredServers(purchases)
      }
      setLoading(false)
    }

    fetchServers()
  }, [])

  useEffect(() => {
    let result = servers

    // Filtre par recherche
    if (searchTerm) {
      result = result.filter(server => 
        server.server_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        server.products.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtre par statut
    if (statusFilter !== "all") {
      result = result.filter(server => server.status === statusFilter)
    }

    // Filtre par type
    if (typeFilter !== "all") {
      result = result.filter(server => server.products.server_type === typeFilter)
    }

    setFilteredServers(result)
  }, [searchTerm, statusFilter, typeFilter, servers])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "active":
        return "bg-green-500"
      case "suspended":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending"
      case "active":
        return "Active"
      case "suspended":
        return "Suspended"
      default:
        return "Unknown"
    }
  }

  const handleAction = async (action: string, serverId: string) => {
    toast({
      title: "Action in progress",
      description: "This feature will be available soon",
    })
  }

  const stats = {
    total: servers.length,
    active: servers.filter(s => s.status === "active").length,
    pending: servers.filter(s => s.status === "pending").length,
    totalCost: servers.reduce((acc, s) => acc + s.total_price, 0)
  }

  if (loading) {
    return (
      <div className="container py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4 text-muted-foreground">Loading your servers...</p>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">My Servers</h1>
            <p className="text-muted-foreground mt-2">
              Manage your servers and check their status
            </p>
          </div>
          <Button onClick={() => router.push("/products")}>
            Order a server
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Box className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Servers</span>
            </div>
            <p className="text-2xl font-bold mt-2">{stats.total}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Active Servers</span>
            </div>
            <p className="text-2xl font-bold mt-2">{stats.active}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Pending</span>
            </div>
            <p className="text-2xl font-bold mt-2">{stats.pending}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Cost</span>
            </div>
            <p className="text-2xl font-bold mt-2">${stats.totalCost}/month</p>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search for a server..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              icon={Search}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="VPS">VPS</SelectItem>
              <SelectItem value="Cloud">Cloud</SelectItem>
              <SelectItem value="Dedicated">Dedicated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Server list */}
        {filteredServers.length === 0 ? (
          <Card className="p-6 text-center">
            <Server className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No servers found</h3>
            <p className="text-muted-foreground mb-4">
              {servers.length === 0
                ? "You don't have any servers yet. Start by ordering one!"
                : "No servers match your search criteria."}
            </p>
            {servers.length === 0 && (
              <Button onClick={() => router.push("/products")}>
                View available servers
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredServers.map((server) => (
              <Card key={server.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{server.server_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {server.products.name} - {server.products.server_type}
                    </p>
                  </div>
                  <Badge 
                    className={getStatusColor(server.status)}
                    variant="secondary"
                  >
                    {getStatusText(server.status)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                    <span>{server.cpu_cores} vCPU</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                    <span>{server.storage_gb} GB SSD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-muted-foreground" />
                    <span>{server.ram_gb} GB RAM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span>{server.bandwidth_tb} TB/month</span>
                  </div>
                </div>

                <div className="flex gap-2 text-sm text-muted-foreground mb-6">
                  {server.backup_enabled && (
                    <Badge variant="outline" className="gap-1">
                      <Server className="h-3 w-3" /> Backup
                    </Badge>
                  )}
                  {server.ddos_protection && (
                    <Badge variant="outline" className="gap-1">
                      <Shield className="h-3 w-3" /> DDoS Protection
                    </Badge>
                  )}
                  {server.managed_support && (
                    <Badge variant="outline" className="gap-1">
                      <HeartPulse className="h-3 w-3" /> Support
                    </Badge>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <span className="text-2xl font-bold">
                      ${server.total_price}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <div className="flex gap-2">
                    {server.status === "active" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction("restart", server.id)}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction("terminal", server.id)}
                        >
                          <Terminal className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleAction("details", server.id)}
                        >
                          Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleAction("settings", server.id)}
                        >
                          Settings
                        </DropdownMenuItem>
                        {server.status === "active" && (
                          <DropdownMenuItem
                            onClick={() => handleAction("power", server.id)}
                            className="text-red-500"
                          >
                            Shutdown
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

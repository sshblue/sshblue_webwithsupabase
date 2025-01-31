"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Cpu, CircuitBoard, HardDrive, Globe, Server, Network } from "lucide-react"

interface ProductProps {
  product: {
    id: string
    name: string
    description: string
    server_type: string
    cpu_cores: number
    ram_gb: number
    storage_gb: number
    bandwidth_tb: number
    location: string
    price_per_month: number
    os_name: string
    os_version: string
    tags: string[]
  }
  onOrder?: (product: ProductProps["product"]) => void
  isActive?: boolean
}

export function ProductCard({ product, onOrder, isActive }: ProductProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            {product.name}
          </CardTitle>
          <Badge variant="secondary" className="px-3">
            {product.server_type}
          </Badge>
        </div>
        <CardDescription className="text-sm">{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-6">
        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">CPU</div>
              <div className="text-sm text-muted-foreground">{product.cpu_cores} Cores</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CircuitBoard className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">RAM</div>
              <div className="text-sm text-muted-foreground">{product.ram_gb} GB</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">Storage</div>
              <div className="text-sm text-muted-foreground">{product.storage_gb} GB</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Network className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">Bandwidth</div>
              <div className="text-sm text-muted-foreground">{product.bandwidth_tb} TB</div>
            </div>
          </div>
        </div>

        {/* Location & OS */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">Location</div>
              <div className="text-sm text-muted-foreground">{product.location}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">Operating System</div>
              <div className="text-sm text-muted-foreground">{product.os_name} {product.os_version}</div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {product.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">€{product.price_per_month}</span>
          <span className="text-xs text-muted-foreground">/month</span>
        </div>
        <Button 
          className="px-6" 
          onClick={() => onOrder?.(product)}
          variant={isActive ? "secondary" : "default"}
        >
          {isActive ? "Gérer" : "Commander"}
        </Button>
      </CardFooter>
    </Card>
  )
}

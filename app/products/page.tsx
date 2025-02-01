"use client"

import { createClient } from "@/utils/supabase/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cpu, HardDrive, Gauge, Globe } from "lucide-react"
import { ServerConfigurator } from "@/components/server-configurator"
import { useState, useEffect } from "react"

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from("products")
        .select("*")
        .order("price_per_month", { ascending: true })

      if (data) {
        setProducts(data)
      }
      setLoading(false)
    }

    fetchProducts()
  }, [])

  // Group products by category
  const vpsProducts = products?.filter(p => p.server_type === "VPS") || []
  const dedicatedProducts = products?.filter(p => p.server_type === "Dedicated") || []
  const cloudProducts = products?.filter(p => p.server_type === "Cloud") || []

  const handleOrder = (product: any) => {
    setSelectedProduct(product)
  }

  const handleCloseConfigurator = () => {
    setSelectedProduct(null)
  }

  if (loading) {
    return (
      <div className="container py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4 text-muted-foreground">Loading servers...</p>
      </div>
    )
  }

  return (
    <div className="container py-6 lg:py-10">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Our Servers</h1>
          <p className="text-muted-foreground max-w-[700px]">
            High-performance and secure servers for all your projects.
            Choose from our range of VPS, Cloud and Dedicated servers.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="vps" className="space-y-8">
          <TabsList className="grid w-full max-w-[600px] grid-cols-3">
            <TabsTrigger value="vps">VPS Servers</TabsTrigger>
            <TabsTrigger value="cloud">Cloud</TabsTrigger>
            <TabsTrigger value="dedicated">Dedicated</TabsTrigger>
          </TabsList>

          {/* VPS */}
          <TabsContent value="vps" className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {vpsProducts.map((product) => (
                <Card key={product.id} className="relative overflow-hidden">
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {product.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                        <span>{product.cpu_cores} vCPU</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                        <span>{product.storage_gb} GB SSD</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-muted-foreground" />
                        <span>{product.ram_gb} GB RAM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>{product.bandwidth_tb} TB/month</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold">${product.price_per_month}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <Button onClick={() => handleOrder(product)}>Order Now</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Cloud */}
          <TabsContent value="cloud" className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cloudProducts.map((product) => (
                <Card key={product.id} className="relative overflow-hidden">
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {product.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                        <span>{product.cpu_cores} vCPU</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                        <span>{product.storage_gb} GB SSD</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-muted-foreground" />
                        <span>{product.ram_gb} GB RAM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>{product.bandwidth_tb} TB/month</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold">${product.price_per_month}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <Button onClick={() => handleOrder(product)}>Order Now</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Dedicated */}
          <TabsContent value="dedicated" className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dedicatedProducts.map((product) => (
                <Card key={product.id} className="relative overflow-hidden">
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {product.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                        <span>{product.cpu_cores} CPU</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                        <span>{product.storage_gb} GB SSD</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-muted-foreground" />
                        <span>{product.ram_gb} GB RAM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>{product.bandwidth_tb} TB/month</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold">${product.price_per_month}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <Button onClick={() => handleOrder(product)}>Order Now</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">What is the difference between VPS and Dedicated?</h3>
              <p className="text-sm text-muted-foreground">
                A VPS is a virtual private server, ideal for small projects.
                A dedicated server is a physical machine entirely yours, perfect for large applications.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">How long does deployment take?</h3>
              <p className="text-sm text-muted-foreground">
                VPS are deployed in a few minutes. Dedicated servers may take up to 24 hours for hardware configuration.
              </p>
            </Card>
          </div>
        </section>
      </div>

      {/* Configurator */}
      {selectedProduct && (
        <ServerConfigurator
          isOpen={!!selectedProduct}
          onClose={handleCloseConfigurator}
          product={selectedProduct}
        />
      )}
    </div>
  )
}

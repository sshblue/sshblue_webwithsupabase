import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/utils/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product?: any
  onSuccess: () => void
}

export function ProductModal({ isOpen, onClose, product, onSuccess }: ProductModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    server_type: product?.server_type || "VPS",
    cpu_cores: product?.cpu_cores || 1,
    ram_gb: product?.ram_gb || 1,
    storage_gb: product?.storage_gb || 20,
    bandwidth_tb: product?.bandwidth_tb || 1,
    price_per_month: product?.price_per_month || 5,
    backup_enabled: product?.backup_enabled || false,
    ddos_protection: product?.ddos_protection || false,
    managed_support: product?.managed_support || false
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        server_type: product.server_type,
        cpu_cores: product.cpu_cores,
        ram_gb: product.ram_gb,
        storage_gb: product.storage_gb,
        bandwidth_tb: product.bandwidth_tb,
        price_per_month: product.price_per_month,
        backup_enabled: product.backup_enabled,
        ddos_protection: product.ddos_protection,
        managed_support: product.managed_support
      })
    }
  }, [product])

  const { toast } = useToast()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (product) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(formData)
          .eq('id', product.id)

        if (error) throw error

        toast({
          title: "Success",
          description: "Product updated successfully",
        })
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert([formData])

        if (error) throw error

        toast({
          title: "Success",
          description: "Product created successfully",
        })
      }

      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error saving product:', error)
      toast({
        title: "Error",
        description: "Failed to save product",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="server_type">Server Type</Label>
            <Select
              value={formData.server_type}
              onValueChange={(value) => setFormData({ ...formData, server_type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VPS">VPS</SelectItem>
                <SelectItem value="Cloud">Cloud</SelectItem>
                <SelectItem value="Dedicated">Dedicated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cpu_cores">CPU Cores</Label>
              <Input
                id="cpu_cores"
                type="number"
                min="1"
                value={formData.cpu_cores}
                onChange={(e) => setFormData({ ...formData, cpu_cores: parseInt(e.target.value) })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ram_gb">RAM (GB)</Label>
              <Input
                id="ram_gb"
                type="number"
                min="1"
                value={formData.ram_gb}
                onChange={(e) => setFormData({ ...formData, ram_gb: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="storage_gb">Storage (GB)</Label>
              <Input
                id="storage_gb"
                type="number"
                min="1"
                value={formData.storage_gb}
                onChange={(e) => setFormData({ ...formData, storage_gb: parseInt(e.target.value) })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bandwidth_tb">Bandwidth (TB)</Label>
              <Input
                id="bandwidth_tb"
                type="number"
                min="1"
                value={formData.bandwidth_tb}
                onChange={(e) => setFormData({ ...formData, bandwidth_tb: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price_per_month">Price ($/month)</Label>
            <Input
              id="price_per_month"
              type="number"
              min="1"
              step="0.01"
              value={formData.price_per_month}
              onChange={(e) => setFormData({ ...formData, price_per_month: parseFloat(e.target.value) })}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

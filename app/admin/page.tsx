"use client"

import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { ProductModal } from "@/components/product-modal"
import {
  Plus,
  Pencil,
  Trash2
} from "lucide-react"

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([])
  const [servers, setServers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch users
      const { data: usersData } = await supabase
        .from('user_roles')
        .select(`
          id,
          role,
          users:id (
            email,
            created_at
          )
        `)

      if (usersData) {
        setUsers(usersData)
      }

      // Fetch servers
      const { data: serversData } = await supabase
        .from('purchases')
        .select(`
          *,
          products (
            name,
            description,
            server_type
          )
        `)
        .order('created_at', { ascending: false })

      if (serversData) {
        setServers(serversData)
      }

      // Fetch products
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (productsData) {
        setProducts(productsData)
      }

      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
      })
    }
  }

  const deleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)

      if (error) throw error

      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
      
      fetchData()
    } catch (error) {
      console.error('Error deleting product:', error)
      toast({
        title: "Error",
        description: "Failed to delete product",
      })
    }
  }

  if (loading) {
    return (
      <div className="container py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4 text-muted-foreground">Loading dashboard data...</p>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="servers">Servers</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Product Management</h2>
              <Button onClick={() => {
                setSelectedProduct(null)
                setIsProductModalOpen(true)
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>CPU</TableHead>
                  <TableHead>RAM</TableHead>
                  <TableHead>Storage</TableHead>
                  <TableHead>Bandwidth</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>{product.server_type}</TableCell>
                    <TableCell>{product.cpu_cores} vCPU</TableCell>
                    <TableCell>{product.ram_gb} GB</TableCell>
                    <TableCell>{product.storage_gb} GB</TableCell>
                    <TableCell>{product.bandwidth_tb} TB</TableCell>
                    <TableCell>
                      <div className="font-medium">
                        ${product.price_per_month}
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedProduct(product)
                            setIsProductModalOpen(true)
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500"
                          onClick={() => deleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">User Management</h2>
              <Input
                placeholder="Search users..."
                className="max-w-xs"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.users.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      {new Date(user.users.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateUserRole(
                          user.id,
                          user.role === 'admin' ? 'user' : 'admin'
                        )}
                      >
                        Make {user.role === 'admin' ? 'User' : 'Admin'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="servers" className="mt-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Server Management</h2>
              <Input
                placeholder="Search servers..."
                className="max-w-xs"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {servers.map((server) => (
                  <TableRow key={server.id}>
                    <TableCell>{server.server_name}</TableCell>
                    <TableCell>{server.products.server_type}</TableCell>
                    <TableCell>{server.status}</TableCell>
                    <TableCell>{server.user_id}</TableCell>
                    <TableCell>${server.total_price}/month</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6">
              <h3 className="font-semibold text-muted-foreground mb-2">
                Total Users
              </h3>
              <p className="text-3xl font-bold">{users.length}</p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-muted-foreground mb-2">
                Total Servers
              </h3>
              <p className="text-3xl font-bold">{servers.length}</p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-muted-foreground mb-2">
                Monthly Revenue
              </h3>
              <p className="text-3xl font-bold">
                ${servers.reduce((acc, s) => acc + s.total_price, 0)}/month
              </p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={selectedProduct}
        onSuccess={fetchData}
      />
    </div>
  )
}

const updateUserRole = async (userId: string, newRole: 'user' | 'admin') => {
  try {
    const { error } = await supabase
      .from('user_roles')
      .update({ role: newRole })
      .eq('id', userId)

    if (error) throw error

    toast({
      title: "Success",
      description: "User role updated successfully",
    })
    
    fetchData()
  } catch (error) {
    console.error('Error updating role:', error)
    toast({
      title: "Error",
      description: "Failed to update user role",
    })
  }
}

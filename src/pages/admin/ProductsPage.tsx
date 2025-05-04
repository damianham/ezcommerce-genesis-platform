
import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { InventoryTable } from "@/components/admin/inventory-table"
import { products } from "@/data/products"
import { Product } from "@/types/product"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminProductsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [productsList, setProductsList] = useState(products)
  
  useEffect(() => {
    document.title = "Products | EzCommerce Admin"
  }, [])
  
  const handleEditProduct = (product: Product) => {
    toast({
      title: "Edit Product",
      description: `Editing ${product.name}. This would open a product form in a real app.`,
    })
  }
  
  const handleDeleteProduct = (productId: string) => {
    toast({
      title: "Product Deleted",
      description: `Product ID ${productId} has been deleted.`,
    })
    
    // In a real app, this would call an API to delete the product
    setProductsList(productsList.filter(p => p.id !== productId))
  }
  
  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    // In a real app, this would call an API to add the product
    const newProduct: Product = {
      id: String(Date.now()),
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      images: ["https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=2076&auto=format&fit=crop"],
      category: formData.get("category") as string,
      stock: Number(formData.get("stock")),
      createdAt: new Date().toISOString(),
    }
    
    setProductsList([newProduct, ...productsList])
    
    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added to your inventory.`,
    })
    
    setIsDialogOpen(false)
  }
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">
              Manage your product inventory
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new product. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddProduct} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" name="category" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" name="description" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input id="price" name="price" type="number" min="0" step="0.01" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" name="stock" type="number" min="0" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Product</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <InventoryTable 
          products={productsList} 
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>
    </AdminLayout>
  )
}

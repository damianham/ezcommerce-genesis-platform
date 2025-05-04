
import { useState, useEffect } from "react"
import { products } from "@/data/products"
import { ProductGrid } from "@/components/product/product-grid"
import { ProductFilters } from "@/components/product/product-filters"
import { StoreLayout } from "@/components/layout/store-layout"
import { Button } from "@/components/ui/button"
import { ChevronDown, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [showFilters, setShowFilters] = useState(false)
  
  useEffect(() => {
    document.title = "Products | EzCommerce"
  }, [])
  
  const handleSortChange = (value: string) => {
    let sortedProducts = [...filteredProducts]
    
    switch (value) {
      case "price-low-high":
        sortedProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        sortedProducts.sort((a, b) => b.price - a.price)
        break
      case "newest":
        sortedProducts.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
      case "rating":
        sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default:
        // Default sorting (featured or relevance)
        break
    }
    
    setFilteredProducts(sortedProducts)
  }
  
  const handleFilterChange = (filters: { price: [number, number]; categories: string[] }) => {
    const { price, categories } = filters
    
    const filtered = products.filter((product) => {
      const matchesPrice = product.price >= price[0] && product.price <= price[1]
      const matchesCategory =
        categories.length === 0 || categories.includes(product.category)
      
      return matchesPrice && matchesCategory
    })
    
    setFilteredProducts(filtered)
  }
  
  return (
    <StoreLayout>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
          <p className="mt-2 text-muted-foreground">
            Browse our collection of quality products
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar (desktop) */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters onFilterChange={handleFilterChange} />
          </div>
          
          {/* Mobile filters */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden mb-4">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="px-1 py-4">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <ProductFilters onFilterChange={handleFilterChange} />
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Products grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} products
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm hidden md:inline">Sort by:</span>
                <Select onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Featured" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your filters to find what you're looking for
                </p>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </div>
        </div>
      </div>
    </StoreLayout>
  )
}


import { Link } from "react-router-dom"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Product } from "@/types/product"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart()
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price)
  
  const discountedPrice = product.discount 
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(product.price * (1 - product.discount / 100))
    : null
  
  return (
    <div className={cn("group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md", className)}>
      <Link 
        to={`/products/${product.id}`}
        className="block aspect-square overflow-hidden"
      >
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.discount && (
          <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
            {product.discount}% OFF
          </Badge>
        )}
      </Link>
      
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <Link 
            to={`/products/${product.id}`}
            className="font-medium hover:underline"
          >
            {product.name}
          </Link>
          
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
        
        <div className="mb-3 flex items-center">
          <div className="flex items-center">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-xs">
                  {i < Math.floor(product.rating || 0) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <span className="ml-2 text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
        </div>
        
        <div className="mb-4 flex items-center">
          {discountedPrice ? (
            <div className="flex items-center gap-2">
              <span className="font-medium text-primary">{discountedPrice}</span>
              <span className="text-sm text-muted-foreground line-through">{formattedPrice}</span>
            </div>
          ) : (
            <span className="font-medium text-primary">{formattedPrice}</span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <Button
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              addToCart(product)
            }}
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          
          <span className="text-xs text-muted-foreground">
            {product.stock} in stock
          </span>
        </div>
      </div>
    </div>
  )
}


import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartItem as CartItemType } from "@/types/product"
import { useCart } from "@/contexts/cart-context"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()
  const { product, quantity } = item
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price)
  
  const formattedSubtotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price * quantity)
  
  return (
    <div className="flex flex-col sm:flex-row border-b py-4">
      <div className="flex w-full sm:w-auto">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>
        
        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between">
              <h3 className="font-medium text-foreground">{product.name}</h3>
              <p className="font-medium text-primary ml-4">{formattedSubtotal}</p>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
          </div>
          
          <div className="mt-2 flex flex-1 items-end justify-between">
            <p className="text-sm text-muted-foreground">{formattedPrice} each</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 sm:mt-0 sm:ml-6 flex items-center justify-between sm:justify-end w-full sm:w-auto">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none rounded-l-md"
            onClick={() => updateQuantity(product.id, quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-10 text-center">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none rounded-r-md"
            onClick={() => updateQuantity(product.id, quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="ml-4 text-destructive"
          onClick={() => removeFromCart(product.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

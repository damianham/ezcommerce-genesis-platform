
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { StoreLayout } from "@/components/layout/store-layout"
import { CartItem } from "@/components/cart/cart-item"
import { CartSummary } from "@/components/cart/cart-summary"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function CartPage() {
  const { cart, clearCart } = useCart()
  
  useEffect(() => {
    document.title = "Your Cart | EzCommerce"
  }, [])
  
  return (
    <StoreLayout>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
          <p className="mt-2 text-muted-foreground">
            Review your items before checkout
          </p>
        </div>
        
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-6 rounded-full bg-muted p-6">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
            <p className="mb-6 max-w-md text-muted-foreground">
              Looks like you haven't added anything to your cart yet. 
              Start shopping to fill it with great products!
            </p>
            <Button asChild>
              <Link to="/products">
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">
                  {cart.length} {cart.length === 1 ? "Item" : "Items"}
                </span>
                <Button 
                  variant="ghost" 
                  onClick={clearCart} 
                  className="text-destructive hover:text-destructive/80"
                >
                  Clear Cart
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" asChild>
                  <Link to="/products">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="md:sticky md:top-20 h-fit">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </StoreLayout>
  )
}

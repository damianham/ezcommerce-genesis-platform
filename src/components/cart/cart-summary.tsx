
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

export function CartSummary() {
  const { subtotal } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax
  
  const formattedSubtotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(subtotal)
  
  const formattedShipping = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(shipping)
  
  const formattedTax = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(tax)
  
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(total)
  
  const handleCheckout = () => {
    setIsProcessing(true)
    // In a real app, this would connect to Stripe
    setTimeout(() => {
      setIsProcessing(false)
    }, 2000)
  }
  
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formattedSubtotal}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? "Free" : formattedShipping}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>{formattedTax}</span>
          </div>
          
          <div className="border-t pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>{formattedTotal}</span>
          </div>
        </div>
        
        <Button 
          className="w-full mt-6"
          size="lg"
          onClick={handleCheckout}
          disabled={subtotal === 0 || isProcessing}
        >
          {isProcessing ? "Processing..." : "Proceed to Checkout"}
          {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {subtotal < 100 ? (
            <p>Free shipping on orders over $100!</p>
          ) : (
            <p>Your order qualifies for free shipping!</p>
          )}
        </div>
      </div>
    </div>
  )
}

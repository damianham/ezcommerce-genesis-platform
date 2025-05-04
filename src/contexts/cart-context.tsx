
import { createContext, useContext, useEffect, useState } from "react"
import { CartItem, Product } from "@/types/product"
import { toast } from "@/components/ui/use-toast"

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [subtotal, setSubtotal] = useState(0)

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem("ezcommerce-cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart:", error)
      }
    }
  }, [])

  useEffect(() => {
    // Calculate subtotal whenever cart changes
    const newSubtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
    setSubtotal(newSubtotal)
    
    // Save to localStorage
    localStorage.setItem("ezcommerce-cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      
      if (existingItem) {
        // Update existing item
        const updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
        
        toast({
          title: "Cart updated",
          description: `Updated ${product.name} quantity to ${existingItem.quantity + quantity}`,
        })
        
        return updatedCart
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart`,
        })
        
        return [...prevCart, { id: product.id, product, quantity }]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === productId)
      
      if (item) {
        toast({
          title: "Removed from cart",
          description: `${item.product.name} has been removed from your cart`,
        })
      }
      
      return prevCart.filter((item) => item.id !== productId)
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      return removeFromCart(productId)
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    })
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

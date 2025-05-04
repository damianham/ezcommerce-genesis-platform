
export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  stock: number
  rating?: number
  reviews?: number
  featured?: boolean
  discount?: number
  createdAt: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
}

export interface Order {
  id: string
  customer: {
    id: string
    name: string
    email: string
  }
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  updatedAt: string
}

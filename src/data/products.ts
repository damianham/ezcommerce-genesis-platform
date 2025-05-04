
import { Product } from "@/types/product"

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear sound with our premium wireless headphones. Features noise cancellation, 30-hour battery life, and comfortable over-ear design.",
    price: 249.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2068&auto=format&fit=crop"
    ],
    category: "electronics",
    stock: 45,
    rating: 4.8,
    reviews: 124,
    featured: true,
    createdAt: "2023-10-15"
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    description: "Track your fitness goals and stay connected with this advanced smartwatch. Features heart rate monitoring, GPS, and a beautiful retina display.",
    price: 399.99,
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "electronics",
    stock: 38,
    rating: 4.6,
    reviews: 89,
    featured: true,
    createdAt: "2023-11-05"
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    description: "Work in comfort with this ergonomically designed office chair. Features lumbar support, adjustable height, and breathable mesh material.",
    price: 199.99,
    images: [
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=1976&auto=format&fit=crop"
    ],
    category: "furniture",
    stock: 15,
    rating: 4.5,
    reviews: 67,
    featured: false,
    createdAt: "2023-09-22"
  },
  {
    id: "4",
    name: "Professional Camera Kit",
    description: "Capture stunning photos and videos with this professional-grade camera kit. Includes multiple lenses, tripod, and carrying case.",
    price: 1299.99,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1974&auto=format&fit=crop"
    ],
    category: "electronics",
    stock: 8,
    rating: 4.9,
    reviews: 42,
    featured: true,
    createdAt: "2023-08-30"
  },
  {
    id: "5",
    name: "Minimalist Desk Lamp",
    description: "Add style and functionality to your workspace with this minimalist desk lamp. Features adjustable brightness and color temperature.",
    price: 49.99,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "home",
    stock: 27,
    rating: 4.3,
    reviews: 51,
    discount: 10,
    featured: false,
    createdAt: "2023-10-10"
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker",
    description: "Take your music anywhere with this waterproof, portable Bluetooth speaker. Features 20-hour battery life and powerful 360° sound.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558537348-c0f8e733989d?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "electronics",
    stock: 32,
    rating: 4.7,
    reviews: 103,
    discount: 15,
    featured: false,
    createdAt: "2023-11-15"
  },
  {
    id: "7",
    name: "Organic Cotton Bedding Set",
    description: "Sleep in luxury with this 100% organic cotton bedding set. Includes duvet cover, fitted sheet, and pillowcases.",
    price: 149.99,
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop"
    ],
    category: "home",
    stock: 20,
    rating: 4.6,
    reviews: 78,
    featured: false,
    createdAt: "2023-09-05"
  },
  {
    id: "8",
    name: "Stainless Steel Water Bottle",
    description: "Stay hydrated in style with this vacuum-insulated stainless steel water bottle. Keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 34.99,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?q=80&w=1974&auto=format&fit=crop"
    ],
    category: "lifestyle",
    stock: 50,
    rating: 4.4,
    reviews: 92,
    discount: 5,
    featured: false,
    createdAt: "2023-10-25"
  }
]

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category)
}

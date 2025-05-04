
import { Category } from "@/types/product"

export const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    description: "Latest gadgets and electronic devices for your everyday needs",
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=2025&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Furniture",
    slug: "furniture",
    description: "Stylish and comfortable furniture for your home and office",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Home",
    slug: "home",
    description: "Everything you need to make your house feel like home",
    image: "https://images.unsplash.com/photo-1511389026070-a14ae610a1be?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Products designed to enhance your everyday life",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1926&auto=format&fit=crop"
  }
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(category => category.slug === slug)
}

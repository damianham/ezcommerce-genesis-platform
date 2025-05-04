
import { useState } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

interface ProductFiltersProps {
  onFilterChange?: (filters: {
    price: [number, number]
    categories: string[]
  }) => void
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  
  const categories = [
    { id: "electronics", label: "Electronics" },
    { id: "furniture", label: "Furniture" },
    { id: "home", label: "Home" },
    { id: "lifestyle", label: "Lifestyle" }
  ]
  
  const handlePriceChange = (value: number[]) => {
    const newPriceRange: [number, number] = [value[0], value[1]]
    setPriceRange(newPriceRange)
    
    if (onFilterChange) {
      onFilterChange({
        price: newPriceRange,
        categories: selectedCategories,
      })
    }
  }
  
  const handleCategoryChange = (category: string, checked: boolean) => {
    let newSelectedCategories: string[]
    
    if (checked) {
      newSelectedCategories = [...selectedCategories, category]
    } else {
      newSelectedCategories = selectedCategories.filter((c) => c !== category)
    }
    
    setSelectedCategories(newSelectedCategories)
    
    if (onFilterChange) {
      onFilterChange({
        price: priceRange,
        categories: newSelectedCategories,
      })
    }
  }
  
  const clearFilters = () => {
    setPriceRange([0, 1500])
    setSelectedCategories([])
    
    if (onFilterChange) {
      onFilterChange({
        price: [0, 1500],
        categories: [],
      })
    }
  }
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Filters</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            Clear
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 md:hidden"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="mb-4 text-sm font-medium">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={priceRange}
                      min={0}
                      max={1500}
                      step={10}
                      onValueChange={handlePriceChange}
                      className="py-4"
                    />
                    <div className="flex items-center justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-4 text-sm font-medium">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={(checked) =>
                            handleCategoryChange(category.id, checked as boolean)
                          }
                        />
                        <label
                          htmlFor={`mobile-category-${category.id}`}
                          className="text-sm"
                        >
                          {category.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <SheetClose asChild>
                  <Button className="w-full">Apply Filters</Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <div className="mt-6 hidden md:block">
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-sm font-medium">Price Range</h3>
            <div className="px-2">
              <Slider
                defaultValue={priceRange}
                min={0}
                max={1500}
                step={10}
                onValueChange={handlePriceChange}
                className="py-4"
              />
              <div className="flex items-center justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-medium">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

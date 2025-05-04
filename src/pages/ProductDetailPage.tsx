
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getProductById } from "@/data/products"
import { StoreLayout } from "@/components/layout/store-layout"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, Truck } from "lucide-react"
import { ProductGrid } from "@/components/product/product-grid"
import { products } from "@/data/products"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>()
  const { addToCart } = useCart()
  
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  
  const product = productId ? getProductById(productId) : undefined
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4)
  
  useEffect(() => {
    if (product) {
      document.title = `${product.name} | EzCommerce`
    }
  }, [product])
  
  if (!product) {
    return (
      <StoreLayout>
        <div className="container px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="mb-8">The product you're looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link to="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to products
            </Link>
          </Button>
        </div>
      </StoreLayout>
    )
  }
  
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
  
  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta))
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity)
  }
  
  return (
    <StoreLayout>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8">
          <Link 
            to="/products" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to products
          </Link>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product images */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border">
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name}
                className="w-full object-cover"
                style={{ height: '500px' }}
              />
            </div>
            
            <div className="flex gap-2 overflow-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 cursor-pointer rounded-md border p-1 ${
                    index === activeImageIndex ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="h-16 w-16 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product details */}
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            <div className="mt-4 flex items-center">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(product.rating || 0) ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>
            
            <div className="mt-4">
              {discountedPrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-semibold text-primary">{discountedPrice}</span>
                  <span className="text-lg text-muted-foreground line-through">{formattedPrice}</span>
                  <span className="rounded-md bg-accent/20 px-2 py-1 text-xs font-medium text-accent-foreground">
                    {product.discount}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-semibold text-primary">{formattedPrice}</span>
              )}
            </div>
            
            <div className="mt-6">
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            <div className="mt-6 flex items-center">
              <span className="text-sm font-medium">Availability:</span>
              {product.stock > 0 ? (
                <span className="ml-2 text-sm text-green-600">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="ml-2 text-sm text-red-600">Out of Stock</span>
              )}
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <span className="text-sm font-medium mr-4">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none rounded-l-md"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none rounded-r-md"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  disabled={product.stock === 0}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
            
            <div className="mt-8 border-t pt-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <Truck className="mr-2 h-4 w-4" />
                Free shipping on orders over $100
              </div>
            </div>
          </div>
        </div>
        
        {/* Product details tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full border-b justify-start rounded-none">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <div className="prose max-w-none dark:prose-invert">
                <p>{product.description}</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                  mollitia, molestiae quas vel sint commodi repudiandae consequuntur
                  voluptatum laborum numquam blanditiis harum quisquam eius sed odit
                  fugiat iusto fuga praesentium optio, eaque rerum!
                </p>
                <p>
                  Provident similique accusantium nemo autem. Veritatis obcaecati
                  tenetur iure eius earum ut molestias architecto voluptate aliquam
                  nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat,
                  odit, tenetur error, harum nesciunt ipsum debitis quas aliquid.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium mb-2">Product Details</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Material</span>
                        <span>Premium</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Dimensions</span>
                        <span>10 x 5 x 3 inches</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Weight</span>
                        <span>1.2 lbs</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Color</span>
                        <span>Multiple Options</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Shipping Information</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Delivery</span>
                        <span>2-5 business days</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Free Shipping</span>
                        <span>On orders over $100</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Returns</span>
                        <span>30 days</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Warranty</span>
                        <span>1 year</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              <div className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                  <div className="mt-2 flex items-center">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(product.rating || 0) ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 text-sm">
                      Based on {product.reviews} reviews
                    </span>
                  </div>
                </div>
                
                {/* Sample reviews */}
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium">JD</span>
                        </div>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-xs text-muted-foreground">Posted 2 weeks ago</p>
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        <span>★★★★★</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">
                      Great product! Exactly what I was looking for and the quality is outstanding.
                      Would definitely recommend to anyone considering this purchase.
                    </p>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium">AS</span>
                        </div>
                        <div>
                          <p className="font-medium">Alice Smith</p>
                          <p className="text-xs text-muted-foreground">Posted 1 month ago</p>
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        <span>★★★★☆</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">
                      Very satisfied with my purchase. The only reason for 4 stars instead of 5
                      is that shipping took a little longer than expected. The product itself is excellent.
                    </p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button>Write a Review</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      </div>
    </StoreLayout>
  )
}

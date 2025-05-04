
import { useEffect } from "react"
import { BarChart3, Box, DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { StatsCard } from "@/components/admin/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from "recharts"

export default function DashboardPage() {
  useEffect(() => {
    document.title = "Dashboard | EzCommerce Admin"
  }, [])
  
  // Sample data for charts
  const salesData = [
    { name: "Jan", sales: 4000, orders: 24 },
    { name: "Feb", sales: 3000, orders: 18 },
    { name: "Mar", sales: 5000, orders: 30 },
    { name: "Apr", sales: 8000, orders: 42 },
    { name: "May", sales: 10000, orders: 56 },
    { name: "Jun", sales: 7000, orders: 38 },
    { name: "Jul", sales: 9000, orders: 49 },
  ]
  
  const categoryData = [
    { name: "Electronics", value: 42 },
    { name: "Furniture", value: 18 },
    { name: "Home", value: 27 },
    { name: "Lifestyle", value: 13 },
  ]
  
  const topProducts = [
    { id: 1, name: "Premium Wireless Headphones", sales: 123, revenue: 30747 },
    { id: 2, name: "Smart Watch Series 5", sales: 98, revenue: 39199 },
    { id: 4, name: "Professional Camera Kit", sales: 76, revenue: 98799 },
    { id: 6, name: "Portable Bluetooth Speaker", sales: 65, revenue: 8449 },
  ]
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your store's performance
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Revenue"
            value="$45,231.89"
            icon={<DollarSign className="h-4 w-4" />}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatsCard
            title="Orders"
            value="356"
            icon={<ShoppingCart className="h-4 w-4" />}
            trend={{ value: 8.2, isPositive: true }}
            variant="info"
          />
          <StatsCard
            title="Products"
            value="124"
            icon={<Box className="h-4 w-4" />}
            trend={{ value: 2.1, isPositive: true }}
            variant="success"
          />
          <StatsCard
            title="Customers"
            value="832"
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 5.7, isPositive: true }}
            variant="warning"
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly sales revenue and orders</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={salesData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="sales"
                      name="Revenue ($)"
                      stroke="hsl(var(--primary))"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="orders"
                      name="Orders"
                      stroke="hsl(var(--accent))"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Product distribution across categories</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={categoryData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Products" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best performing products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left font-medium">Product</th>
                    <th className="py-3 text-right font-medium">Sales</th>
                    <th className="py-3 text-right font-medium">Revenue</th>
                    <th className="py-3 text-right font-medium">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="py-3 font-medium">{product.name}</td>
                      <td className="py-3 text-right">{product.sales}</td>
                      <td className="py-3 text-right">${product.revenue.toLocaleString()}</td>
                      <td className="py-3 text-right">
                        <span className="inline-flex items-center text-green-600">
                          <TrendingUp className="mr-1 h-4 w-4" />
                          {Math.floor(Math.random() * 20 + 5)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}


import { Link, useLocation } from "react-router-dom"
import { BarChart3, Box, Home, Layers, Package, Settings, ShoppingBag, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  href: string
  isActive?: boolean
}

function SidebarItem({ icon: Icon, title, href, isActive }: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
        isActive ? "bg-secondary text-primary" : "text-muted-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{title}</span>
    </Link>
  )
}

export function AdminSidebar() {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path
  
  return (
    <div className="flex min-h-screen w-full flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link to="/admin" className="flex items-center gap-2 font-semibold">
          <ShoppingBag className="h-6 w-6" />
          <span className="font-bold">EzCommerce</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-4">
          <SidebarItem
            icon={Home}
            title="Dashboard"
            href="/admin"
            isActive={isActive("/admin")}
          />
          <SidebarItem
            icon={Package}
            title="Products"
            href="/admin/products"
            isActive={isActive("/admin/products")}
          />
          <SidebarItem
            icon={Layers}
            title="Categories"
            href="/admin/categories"
            isActive={isActive("/admin/categories")}
          />
          <SidebarItem
            icon={ShoppingBag}
            title="Orders"
            href="/admin/orders"
            isActive={isActive("/admin/orders")}
          />
          <SidebarItem
            icon={Users}
            title="Customers"
            href="/admin/customers"
            isActive={isActive("/admin/customers")}
          />
          <SidebarItem
            icon={Box}
            title="Inventory"
            href="/admin/inventory"
            isActive={isActive("/admin/inventory")}
          />
          <SidebarItem
            icon={BarChart3}
            title="Analytics"
            href="/admin/analytics"
            isActive={isActive("/admin/analytics")}
          />
          <SidebarItem
            icon={Settings}
            title="Settings"
            href="/admin/settings"
            isActive={isActive("/admin/settings")}
          />
        </div>
      </ScrollArea>
    </div>
  )
}

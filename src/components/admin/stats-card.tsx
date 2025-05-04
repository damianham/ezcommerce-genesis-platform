
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statsCardVariants = cva(
  "rounded-lg p-6 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        primary: "bg-primary/10 text-primary border border-primary/20",
        success: "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20",
        info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
        warning: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20",
        danger: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface StatsCardProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statsCardVariants> {
  title: string
  value: string | number
  icon?: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function StatsCard({
  title,
  value,
  icon,
  trend,
  variant,
  className,
  ...props
}: StatsCardProps) {
  return (
    <div 
      className={cn(statsCardVariants({ variant }), "flex flex-col", className)} 
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{title}</span>
        {icon && <div className="opacity-80">{icon}</div>}
      </div>
      
      <div className="mt-2 flex items-end justify-between">
        <div>
          <div className="text-2xl font-semibold">{value}</div>
          {trend && (
            <div className={cn(
              "mt-1 flex items-center text-xs",
              trend.isPositive ? "text-green-500" : "text-red-500"
            )}>
              <span className="flex items-center">
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="ml-1 text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

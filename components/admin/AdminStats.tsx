"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Package, Users, ShoppingCart } from "lucide-react"

export default function AdminStats() {
  const stats = [
    {
      title: "Ventas Totales",
      value: "€45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Productos",
      value: "234",
      change: "+12",
      trend: "up",
      icon: Package,
    },
    {
      title: "Usuarios",
      value: "2,847",
      change: "+15.3%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Pedidos",
      value: "156",
      change: "-2.4%",
      trend: "down",
      icon: ShoppingCart,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
              <span>desde el mes pasado</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

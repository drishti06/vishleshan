import { ArrowDown, ArrowUp, DollarSign, Package, ShoppingCart, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardCards() {
  const cards = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      description: "12% from last month",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "New Orders",
      value: "356",
      description: "5% from last month",
      icon: ShoppingCart,
      trend: "up",
    },
    {
      title: "Products",
      value: "2,345",
      description: "10 added today",
      icon: Package,
      trend: "neutral",
    },
    {
      title: "Active Users",
      value: "573",
      description: "3% from last month",
      icon: Users,
      trend: "down",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {card.trend === "up" && <ArrowUp className="mr-1 h-3 w-3 text-emerald-500" />}
              {card.trend === "down" && <ArrowDown className="mr-1 h-3 w-3 text-rose-500" />}
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

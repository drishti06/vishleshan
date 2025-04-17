import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Product = {
  name: string
  sales: number
}

export function TopProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setProducts([
            { name: "Smartphone", sales: 342 },
            { name: "Laptop", sales: 270 },
            { name: "Headphones", sales: 190 },
            { name: "Smartwatch", sales: 145 },
            { name: "Tablet", sales: 95 },
          ])
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching products:", error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Your best-selling products this month.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[200px] w-full animate-pulse rounded-lg bg-muted"></div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={products} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" scale="band" />
              <Tooltip
                formatter={(value) => [`${value} units`, "Sales"]}
                labelFormatter={(value) => `Product: ${value}`}
              />
              <Bar dataKey="sales" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

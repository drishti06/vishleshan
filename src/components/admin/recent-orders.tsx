import { useState, useEffect } from "react"
import { Eye } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Order = {
  id: string
  customer: string
  status: "pending" | "processing" | "completed" | "cancelled"
  date: string
  total: string
  items: {
    id: number
    name: string
    quantity: number
    price: string
  }[]
}

export function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    // Simulate API call
    const fetchOrders = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setOrders([
            {
              id: "ORD-001",
              customer: "John Doe",
              status: "completed",
              date: "2023-04-14",
              total: "$129.99",
              items: [
                { id: 1, name: "Wireless Headphones", quantity: 1, price: "$89.99" },
                { id: 2, name: "Phone Case", quantity: 1, price: "$39.99" },
              ],
            },
            {
              id: "ORD-002",
              customer: "Jane Smith",
              status: "processing",
              date: "2023-04-13",
              total: "$259.99",
              items: [
                { id: 3, name: "Smart Watch", quantity: 1, price: "$199.99" },
                { id: 4, name: "Charging Cable", quantity: 2, price: "$29.99" },
              ],
            },
            {
              id: "ORD-003",
              customer: "Robert Johnson",
              status: "pending",
              date: "2023-04-13",
              total: "$349.99",
              items: [{ id: 5, name: "Tablet", quantity: 1, price: "$349.99" }],
            },
            {
              id: "ORD-004",
              customer: "Emily Davis",
              status: "cancelled",
              date: "2023-04-12",
              total: "$59.99",
              items: [{ id: 6, name: "Bluetooth Speaker", quantity: 1, price: "$59.99" }],
            },
          ])
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching orders:", error)
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setOpenDialog(true)
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500"
      case "processing":
        return "bg-amber-500"
      case "pending":
        return "bg-sky-500"
      case "cancelled":
        return "bg-rose-500"
      default:
        return "bg-slate-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>You have {orders.length} total orders.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-2">
                <div className="space-y-1">
                  <div className="h-4 w-32 animate-pulse rounded bg-muted"></div>
                  <div className="h-3 w-24 animate-pulse rounded bg-muted"></div>
                </div>
                <div className="h-8 w-20 animate-pulse rounded bg-muted"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <div className="font-medium">{order.customer}</div>
                  <div className="text-sm text-muted-foreground">
                    {order.id} • {order.date}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`${getStatusColor(order.status)} text-white`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                  <Button variant="ghost" size="icon" onClick={() => handleViewOrder(order)}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View order {order.id}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Placed on {selectedOrder?.date} by {selectedOrder?.customer}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg border p-3">
              <div className="font-medium">Order Items</div>
              <div className="mt-2 space-y-2">
                {selectedOrder?.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>{item.price}</span>
                  </div>
                ))}
                <div className="mt-2 flex justify-between border-t pt-2 font-medium">
                  <span>Total</span>
                  <span>{selectedOrder?.total}</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="font-medium">Status</div>
              <div className="mt-2">
                <Badge
                  variant="outline"
                  className={`${selectedOrder && getStatusColor(selectedOrder.status)} text-white`}
                >
                  {selectedOrder?.status.charAt(0).toUpperCase() + selectedOrder?.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

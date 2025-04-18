import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type Order = {
  id: string;
  customer: string;
  email: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  date: string;
  total: string;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: string;
  }[];
};

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();

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
              email: "john.doe@example.com",
              status: "completed",
              date: "2023-04-14",
              total: "$129.99",
              items: [
                {
                  id: 1,
                  name: "Wireless Headphones",
                  quantity: 1,
                  price: "$89.99",
                },
                { id: 2, name: "Phone Case", quantity: 1, price: "$39.99" },
              ],
            },
            {
              id: "ORD-002",
              customer: "Jane Smith",
              email: "jane.smith@example.com",
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
              email: "robert.j@example.com",
              status: "pending",
              date: "2023-04-13",
              total: "$349.99",
              items: [{ id: 5, name: "Tablet", quantity: 1, price: "$349.99" }],
            },
            {
              id: "ORD-004",
              customer: "Emily Davis",
              email: "emily.d@example.com",
              status: "cancelled",
              date: "2023-04-12",
              total: "$59.99",
              items: [
                {
                  id: 6,
                  name: "Bluetooth Speaker",
                  quantity: 1,
                  price: "$59.99",
                },
              ],
            },
            {
              id: "ORD-005",
              customer: "Michael Wilson",
              email: "michael.w@example.com",
              status: "completed",
              date: "2023-04-11",
              total: "$149.99",
              items: [
                {
                  id: 7,
                  name: "Fitness Tracker",
                  quantity: 1,
                  price: "$149.99",
                },
              ],
            },
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    // Update order status
    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            status: newStatus as Order["status"],
          };
        }
        return order;
      })
    );

    toast({
      title: "Order status updated",
      description: `Order ${orderId} status changed to ${newStatus}.`,
    });
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500";
      case "processing":
        return "bg-amber-500";
      case "pending":
        return "bg-sky-500";
      case "cancelled":
        return "bg-rose-500";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-start">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          View and manage customer orders.
        </p>
      </div>
      <div className="rounded-md border">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></div>
            <p className="mt-2 text-sm text-muted-foreground">
              Loading orders...
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Select
                      defaultValue={order.status}
                      onValueChange={(value) =>
                        handleStatusChange(order.id, value)
                      }
                    >
                      <SelectTrigger className="max-w-xl">
                        <SelectValue>
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(
                              order.status as Order["status"]
                            )} text-white`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">
                          <Badge
                            variant="outline"
                            className="bg-sky-500 text-white"
                          >
                            Pending
                          </Badge>
                        </SelectItem>
                        <SelectItem value="processing">
                          <Badge
                            variant="outline"
                            className="bg-amber-500 text-white"
                          >
                            Processing
                          </Badge>
                        </SelectItem>
                        <SelectItem value="completed">
                          <Badge
                            variant="outline"
                            className="bg-emerald-500 text-white"
                          >
                            Completed
                          </Badge>
                        </SelectItem>
                        <SelectItem value="cancelled">
                          <Badge
                            variant="outline"
                            className="bg-rose-500 text-white"
                          >
                            Cancelled
                          </Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">{order.total}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() => handleViewOrder(order)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View order {order.id}</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
              <DialogDescription>
                Placed on {selectedOrder?.date} by {selectedOrder?.customer}
              </DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Customer Information</div>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>Name: {selectedOrder.customer}</p>
                    <p>Email: {selectedOrder.email}</p>
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Order Items</div>
                  <div className="mt-2 space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>{item.price}</span>
                      </div>
                    ))}
                    <div className="mt-2 flex justify-between border-t pt-2 font-medium">
                      <span>Total</span>
                      <span>{selectedOrder.total}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Status</div>
                  <div className="mt-2">
                    <Badge
                      variant="default"
                      className={`${getStatusColor(
                        selectedOrder.status
                      )} text-white`}
                    >
                      {selectedOrder.status.charAt(0).toUpperCase() +
                        selectedOrder.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

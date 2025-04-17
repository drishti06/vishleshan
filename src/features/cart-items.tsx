import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/lib/store/cart-slice";
import type { RootState } from "@/lib/store/store";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router";

export function CartItems() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleRemoveFromCart = (
    id: number,
    name: string,
    variant?: { color: string; size: string }
  ) => {
    dispatch(removeFromCart({ id, variant }));
    toast({
      title: "Removed from cart",
      description: `${name} has been removed from your cart.`,
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);

    // Simulate checkout process
    setTimeout(() => {
      dispatch(clearCart());
      toast({
        title: "Order placed successfully",
        description: "Thank you for your purchase! Your order has been placed.",
      });
      setIsCheckingOut(false);
    }, 2000);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.stock,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-muted-foreground">
          Items added to your cart will appear here.
        </p>
        <Link to="/shop" className="mt-4">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }
  console.log(cartItems);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <AnimatePresence>
          {cartItems.map((item) => (
            <motion.div
              key={`${item.id}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="relative aspect-square h-24 w-24 overflow-hidden rounded-md">
                      <img
                        src={item.images[0] || "/placeholder.svg"}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        {/* {item.variant && (
                          <p className="text-sm text-muted-foreground">
                            {item.variant.color}, {item.variant.size}
                          </p>
                        )} */}
                        <p className="mt-1 font-medium">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleUpdateQuantity(
                                item.id,
                                Math.max(1, item.stock - 1)
                                // item.variant
                              )
                            }
                            disabled={item.stock <= 1}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <span className="w-8 text-center">{item.stock}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.stock + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleRemoveFromCart(item.id, item.title)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={handleClearCart}>
            Clear Cart
          </Button>
        </div>
      </div>
      <div>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 p-6 pt-0">
            <Link to="/checkout" className="w-full">
              <Button
                className="w-full"
                size="lg"
                disabled={isCheckingOut}
                onClick={handleCheckout}
              >
                {isCheckingOut ? "Processing..." : "Checkout"}
              </Button>
            </Link>
            <p className="text-center text-xs text-muted-foreground">
              Shipping and taxes calculated at checkout.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

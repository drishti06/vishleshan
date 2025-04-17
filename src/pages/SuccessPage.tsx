"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import type { RootState } from "@/lib/store/store";
import { Link, useNavigate } from "react-router";

export default function CheckoutSuccessPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();
  // Redirect to home if cart is not empty (meaning they didn't complete checkout)
  useEffect(() => {
    if (cartItems.length > 0) {
      navigate("/");
    }
  }, [cartItems]);

  return (
    <div className="container flex flex-col items-center justify-center px-4 py-16 text-center md:px-6 md:py-24">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <CheckCircle2 className="h-24 w-24 text-green-500" />
      </motion.div>
      <motion.h1
        className="mt-6 text-3xl font-bold md:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Order Placed Successfully!
      </motion.h1>
      <motion.p
        className="mt-4 max-w-[600px] text-muted-foreground md:text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Thank you for your purchase. We've received your order and will begin
        processing it right away. You will receive a confirmation email shortly.
      </motion.p>
      <motion.div
        className="mt-8 flex flex-col gap-4 sm:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link to="/">
          <Button size="lg">Return to Home</Button>
        </Link>
        <Link to="/shop">
          <Button variant="outline" size="lg">
            Continue Shopping
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

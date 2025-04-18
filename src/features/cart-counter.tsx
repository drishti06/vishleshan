import { motion } from "framer-motion";
import type { RootState } from "@/lib/store/store";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { initializeCart } from "@/lib/store/cart-slice";
import { useEffect } from "react";

export function CartCounter() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems?.reduce((total, item) => total + +item.stock, 0);

  if (totalItems === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground"
    >
      {totalItems}
    </motion.div>
  );
}

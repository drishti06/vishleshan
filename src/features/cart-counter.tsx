import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store/store";

export function CartCounter() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  );

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

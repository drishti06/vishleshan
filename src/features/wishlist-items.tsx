import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { removeFromWishlist } from "@/lib/store/wishlist-slice";
import type { RootState } from "@/lib/store/store";
import { addToCart } from "@/lib/store/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router";

export function WishlistItems() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const { toast } = useToast();

  const handleRemoveFromWishlist = (id: number, name: string) => {
    dispatch(removeFromWishlist(id));
    toast({
      title: "Removed from wishlist",
      description: `${name} has been removed from your wishlist.`,
    });
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart and removed from your wishlist.`,
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
        <p className="mt-2 text-muted-foreground">
          Items added to your wishlist will appear here.
        </p>
        <Link to="/shop" className="mt-4">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden">
              <div className="relative aspect-square">
                <img
                  src={item.images[0] || "/placeholder.svg"}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 bg-background/80 hover:bg-background/90"
                  onClick={() => handleRemoveFromWishlist(item.id, item.title)}
                >
                  <Trash2 className="h-5 w-5 text-muted-foreground" />
                  <span className="sr-only">Remove from wishlist</span>
                </Button>
              </div>
              <CardContent className="p-4">
                <div className="mb-2">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-semibold">{item.title}</h3>
                  </Link>
                  <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleAddToCart(item)}
                >
                  Move to Cart
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}

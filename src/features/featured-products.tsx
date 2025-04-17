import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { addToWishlist, removeFromWishlist } from "@/lib/store/wishlist-slice";
import type { RootState } from "@/lib/store/store";
import { addToCart } from "@/lib/store/cart-slice";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router";
import { Product } from "@/lib/store/product/types";
import { useAppSelector } from "@/lib/store/hooks";

export function FeaturedProducts() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const { products, loading } = useAppSelector(
    (state: RootState) => state.product
  );

  const handleWishlistToggle = (product: Product) => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id);

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast({
        title: "Removed from wishlist",
        description: `${product.title} has been removed from your wishlist.`,
      });
    } else {
      dispatch(addToWishlist(product));
      toast({
        title: "Added to wishlist",
        description: `${product.title} has been added to your wishlist.`,
      });
    }
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Featured Products
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Discover our handpicked selection of premium products that are
              trending right now.
            </p>
          </div>
        </div>
        {loading ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-square animate-pulse bg-muted"></div>
                <CardContent className="p-4">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-muted"></div>
                  <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-muted"></div>
                </CardContent>
                <CardFooter className="p-4">
                  <div className="h-10 w-full animate-pulse rounded bg-muted"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {products
              .filter((prod) => prod.price > 100)
              .map((product) => {
                const isInWishlist = wishlistItems.some(
                  (item) => item.id === product.id
                );

                return (
                  <motion.div key={product.id} variants={item}>
                    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
                      <Link
                        to={`/product/${product.id}`}
                        className="relative block aspect-square overflow-hidden"
                      >
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.title}
                          width={400}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <Badge className="absolute left-2 top-2">
                          {product.category}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 bg-background/80 hover:bg-background/90"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleWishlistToggle(product);
                          }}
                        >
                          <motion.div
                            whileTap={{ scale: 0.8 }}
                            animate={isInWishlist ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.3 }}
                          >
                            <Heart
                              className={`h-5 w-5 ${
                                isInWishlist ? "fill-red-500 text-red-500" : ""
                              }`}
                            />
                          </motion.div>
                          <span className="sr-only">Add to wishlist</span>
                        </Button>
                      </Link>
                      <CardContent className="p-4">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-semibold">{product.title}</h3>
                          <p className="text-lg font-bold">
                            ${product.price.toFixed(2)}
                          </p>
                        </Link>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          className="w-full"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
          </motion.div>
        )}
        <div className="mt-12 flex justify-center">
          <Link to="/shop">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

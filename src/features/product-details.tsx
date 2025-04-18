import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { addToWishlist, removeFromWishlist } from "@/lib/store/wishlist-slice";
import type { RootState } from "@/lib/store/store";
import { addToCart } from "@/lib/store/cart-slice";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Product } from "@/lib/store/product/types";

type ProductVariant = {
  id: number;
  color: string;
  size: string;
  price: number;
  stock: number;
};

type ProductDetails = {
  id: number;
  name: string;
  description: string;
  features: string[];
  category: string;
  rating: number;
  reviewCount: number;
  images: string[];
  variants: ProductVariant[];
};

export function ProductDetails({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );

  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const { toast } = useToast();

  useEffect(() => {
    // API call to fetch product by ID
    const fetchProduct = async () => {
      try {
        // In a real app, this would be an API call
        const { data } = await axios.get(
          `https://dummyjson.com/products/${productId}`
        );
        console.log(data);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (product && selectedColor && selectedSize) {
      const variant = product.find(
        (v: Product) => v.brand === selectedColor && v.size === selectedSize
      );
      setSelectedVariant(variant || null);
    }
  }, [product, selectedColor, selectedSize]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (selectedVariant && quantity < selectedVariant.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    if (product && selectedVariant) {
      dispatch(addToCart(product));

      toast({
        title: "Added to cart",
        description: `${product.title} (${selectedVariant.color}) has been added to your cart.`,
      });
    }
  };

  const handleWishlistToggle = () => {
    if (!product) return;

    const isInWishlist = wishlistItems.some((item) => item.id === product.id);

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast({
        title: "Removed from wishlist",
        description: `${product.title} has been removed from your wishlist.`,
      });
    } else {
      dispatch(
        addToWishlist({
          id: product.id,
          title: product.title,
          price: selectedVariant?.price || 0,
          image: product.images[0],
          category: product.category,
        })
      );
      toast({
        title: "Added to wishlist",
        description: `${product.title} has been added to your wishlist.`,
      });
    }
  };

  if (loading || !product) {
    return <div>Loading...</div>;
  }

  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-lg">
          <motion.img
            key={selectedImage}
            src={product.images[selectedImage]}
            alt={product.name}
            width={600}
            height={600}
            className="h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex space-x-2 overflow-auto py-2">
          {product.images.map((image, index) => (
            <motion.button
              key={index}
              className={`relative overflow-hidden rounded-md ${
                selectedImage === index
                  ? "ring-2 ring-primary"
                  : "ring-1 ring-border"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${product.name} thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="h-16 w-16 object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="mt-2 flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold">
            ${selectedVariant?.price.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">
            {selectedVariant?.stock
              ? `${selectedVariant.stock} in stock`
              : "Out of stock"}
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 font-medium">Color</h3>
            <RadioGroup
              value={selectedColor}
              onValueChange={handleColorChange}
              className="flex space-x-2"
            >
              {product.variants
                .filter(
                  (v, i, arr) => arr.findIndex((t) => t.color === v.color) === i
                )
                .map((variant) => (
                  <div
                    key={variant.color}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={variant.color}
                      id={`color-${variant.color}`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`color-${variant.color}`}
                      className={`relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full ${
                        variant.color === "black"
                          ? "bg-black"
                          : variant.color === "white"
                          ? "bg-white"
                          : variant.color === "blue"
                          ? "bg-blue-500"
                          : variant.color === "red"
                          ? "bg-red-500"
                          : ""
                      } ${
                        selectedColor === variant.color
                          ? "ring-2 ring-primary ring-offset-2"
                          : ""
                      }`}
                    >
                      <span className="sr-only">{variant.color}</span>
                    </Label>
                  </div>
                ))}
            </RadioGroup>
          </div>
          <div>
            <h3 className="mb-2 font-medium">Size</h3>
            <RadioGroup
              value={selectedSize}
              onValueChange={handleSizeChange}
              className="flex space-x-2"
            >
              {product.variants
                .filter(
                  (v, i, arr) => arr.findIndex((t) => t.size === v.size) === i
                )
                .map((variant) => (
                  <div
                    key={variant.size}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={variant.size}
                      id={`size-${variant.size}`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`size-${variant.size}`}
                      className={`flex h-8 min-w-[2rem] cursor-pointer items-center justify-center rounded-md border px-2 ${
                        selectedSize === variant.size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input"
                      }`}
                    >
                      {variant.size}
                    </Label>
                  </div>
                ))}
            </RadioGroup>
          </div>
          <div>
            <h3 className="mb-2 font-medium">Quantity</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={increaseQuantity}
                disabled={!selectedVariant || quantity >= selectedVariant.stock}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" onClick={handleWishlistToggle}>
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
              <span className="ml-2">
                {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
              </span>
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>
        <Tabs defaultValue="description">
          <TabsList className="w-full">
            <TabsTrigger value="description" className="flex-1">
              Description
            </TabsTrigger>
            <TabsTrigger value="features" className="flex-1">
              Features
            </TabsTrigger>
            <TabsTrigger value="shipping" className="flex-1">
              Shipping
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-4">
            <p className="text-muted-foreground">{product.description}</p>
          </TabsContent>
          <TabsContent value="features" className="pt-4">
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="shipping" className="pt-4">
            <p className="text-muted-foreground">
              Free shipping on orders over $50. Standard delivery takes 3-5
              business days. Express delivery available at checkout.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

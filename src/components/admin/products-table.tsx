import type React from "react";

import { useState, useEffect } from "react";
import { Edit, Trash2, Eye } from "lucide-react";

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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ProductsHeader } from "./products-header";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { RootState } from "@/lib/store/store";
import { fetchProductsAsync } from "@/lib/store/product/product-slice";
import { Product } from "@/lib/store/product/types";

export function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const productList = useAppSelector(
    (state: RootState) => state.product.products
  );

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        const data = await dispatch(fetchProductsAsync()).unwrap();
        setProducts(data);
        setLoading(false);
      } catch (error) {}
    };

    fetchProducts();
  }, [productList, dispatch]);

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setViewDialogOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would be an API call to update the product
      setProducts(
        products.map((p) => (p.id === selectedProduct.id ? selectedProduct : p))
      );

      toast({
        title: "Product updated",
        description: `${selectedProduct.title} has been updated successfully.`,
      });

      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would be an API call to delete the product
      setProducts(products.filter((p) => p.id !== selectedProduct.id));

      toast({
        title: "Product deleted",
        description: `${selectedProduct.title} has been deleted successfully.`,
      });

      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!selectedProduct) return;
    const { name, value } = e.target;
    setSelectedProduct({ ...selectedProduct, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    if (!selectedProduct) return;
    setSelectedProduct({ ...selectedProduct, [name]: value });
  };

  return (
    <div className="flex flex-col gap-5">
      <ProductsHeader />
      <div className="rounded-md border">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></div>
            <p className="mt-2 text-sm text-muted-foreground">
              Loading products...
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.title}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">${product.price}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`${
                        +product.stock < 20 ? "text-rose-500" : ""
                      }`}
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewProduct(product)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View {product.title}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit {product.title}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteProduct(product)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete {product.title}</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* View Product Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Product Details</DialogTitle>
            </DialogHeader>
            {selectedProduct && (
              <div className="grid gap-4 py-4">
                <div className="mx-auto">
                  <img
                    src={selectedProduct.images[0] || "/placeholder.svg"}
                    alt={selectedProduct.title}
                    width={200}
                    height={200}
                    className="rounded-md object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium">
                    {selectedProduct.title}
                  </h3>
                  <Badge variant="outline" className="mt-1 capitalize">
                    {selectedProduct.category}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {selectedProduct.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Price</p>
                    <p className="text-lg">${selectedProduct.price}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Stock</p>
                    <p
                      className={`text-lg ${
                        +selectedProduct.stock < 20 ? "text-rose-500" : ""
                      }`}
                    >
                      {selectedProduct.stock} units
                    </p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Product Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>
                Make changes to the product details below.
              </DialogDescription>
            </DialogHeader>
            {selectedProduct && (
              <form onSubmit={handleUpdateProduct}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Product Name</Label>
                    <Input
                      id="edit-name"
                      name="name"
                      value={selectedProduct.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      name="description"
                      value={selectedProduct.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-price">Price ($)</Label>
                      <Input
                        id="edit-price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={selectedProduct.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-stock">Stock</Label>
                      <Input
                        id="edit-stock"
                        name="stock"
                        type="number"
                        min="0"
                        value={selectedProduct.stock}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-category">Category</Label>
                    <Select
                      value={selectedProduct.category}
                      onValueChange={(value) =>
                        handleSelectChange("category", value)
                      }
                      required
                    >
                      <SelectTrigger id="edit-category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="home">Home & Kitchen</SelectItem>
                        <SelectItem value="books">Books</SelectItem>
                        <SelectItem value="toys">Toys & Games</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-image">Image URL</Label>
                    <Input
                      id="edit-image"
                      name="image"
                      type="url"
                      value={selectedProduct.images[0]}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Product Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                product
                {selectedProduct ? ` "${selectedProduct.title}"` : ""} from your
                inventory.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

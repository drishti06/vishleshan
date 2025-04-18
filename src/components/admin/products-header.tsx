import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/lib/store/hooks";
import {
  addProduct,
  fetchProductsAsync,
} from "@/lib/store/product/product-slice";

const productSchema = z.object({
  title: z.string().trim().min(1, "Product name is required."),
  description: z.string().trim().min(1, "Description is required."),
  category: z.string().min(1, "Category is required."),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Enter a valid price number",
  }),
  stock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Enter a valid stock number",
  }),
  images: z.array(z.string().trim()).min(1, "At least one image is required."),
});

type ProductFormData = z.infer<typeof productSchema>;

export function ProductsHeader() {
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      images: [{ value: "" } as any],
    } as any,
  });

  const { fields, append, remove } = useFieldArray<any>({
    control: form.control,
    name: "images",
  });
  const { toast } = useToast();

  const dispatch = useAppDispatch();

  const onSubmit = async (data: ProductFormData) => {
    try {
      // For now simulate API delay
      await dispatch(addProduct(data)).unwrap();

      toast({
        title: "Product Added",
        description: `${data.title} has been successfully added.`,
      });

      setOpenDialog(false);
      await dispatch(fetchProductsAsync());
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while adding the product.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-start">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">
          Manage your product inventory, add new products, or update existing
          ones.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="search"
          placeholder="Search products..."
          className="w-full sm:w-[250px]"
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="default" onClick={() => setOpenDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </motion.div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new product with variants to
              your inventory.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">
                            Electronics
                          </SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="home">Home & Kitchen</SelectItem>
                          <SelectItem value="books">Books</SelectItem>
                          <SelectItem value="toys">Toys & Games</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormLabel className="mb-2">Image URLs</FormLabel>
                <div className="grid gap-3">
                  {fields.map((fieldItem, index) => (
                    <motion.div
                      key={fieldItem.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex gap-2 items-center"
                    >
                      <FormField
                        control={form.control}
                        name={`images.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </motion.div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => append(" ")}
                  >
                    + Add Image
                  </Button>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Adding..." : "Add Product"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

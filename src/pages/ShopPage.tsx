import { ProductFilters } from "@/features/product-filters";
import { ProductGrid } from "@/features/product-grid";
import { ProductSkeleton } from "@/features/product-skeleton";
import { Suspense } from "react";
import { Helmet } from "react-helmet";

export default function ShopPage() {
  return (
    <>
      <Helmet>
        <title>Shop All Products - ShopNow</title>
        <meta
          name="description"
          content="Browse our wide selection of products. Find the perfect item for you."
        />
      </Helmet>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Shop All Products
            </h1>
            <p className="text-muted-foreground">
              Browse our wide selection of products.
            </p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
          <ProductFilters />
          <div>
            <Suspense fallback={<ProductSkeleton />}>
              <ProductGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

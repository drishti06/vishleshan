import { ProductDetails } from "@/features/product-details";
import { ProductDetailsSkeleton } from "@/features/product-details-skeleton";
import { RelatedProducts } from "@/features/related-products";
import { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";

export default function ProductPage() {
  const { id } = useParams();

  if (!id) {
    return <div>Product Id not found.</div>;
  }

  return (
    <>
      <Helmet>
        <title>Product Details - ShopNow</title>
        <meta
          name="description"
          content="View detailed product information, specifications, and variants."
        />
      </Helmet>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <Suspense fallback={<ProductDetailsSkeleton />}>
          <ProductDetails productId={id} />
        </Suspense>
        <RelatedProducts />
      </div>
    </>
  );
}

import { WishlistItems } from "@/features/wishlist-items";
import { Helmet } from "react-helmet";

export default function WishlistPage() {
  return (
    <>
      <Helmet>
        <title>My Wishlist - ShopNow</title>
        <meta
          name="description"
          content="View and manage your wishlist items."
        />
      </Helmet>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
            <p className="text-muted-foreground">
              View and manage your wishlist items.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <WishlistItems />
        </div>
      </div>
    </>
  );
}

import { CartItems } from "@/features/cart-items"
import { Helmet } from "react-helmet"

export default function CartPage() {
  return (
    <>
      <Helmet>
        <title>Shopping Cart - ShopNow</title>
        <meta name="description" content="View and manage your shopping cart items." />
      </Helmet>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
            <p className="text-muted-foreground">Review and manage your cart items.</p>
          </div>
        </div>
        <div className="mt-8">
          <CartItems />
        </div>
      </div>
    </>
  )
}

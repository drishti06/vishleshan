import { CheckoutForm } from "@/features/checkout-form"
import { Helmet } from "react-helmet"

export default function CheckoutPage() {
  return (
    <>
      <Helmet>
        <title>Checkout - ShopNow</title>
        <meta name="description" content="Complete your purchase and place your order." />
      </Helmet>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-start">
            <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase and place your order.</p>
          </div>
        </div>
        <div className="mt-8">
          <CheckoutForm />
        </div>
      </div>
    </>
  )
}

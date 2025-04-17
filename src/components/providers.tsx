import type React from "react";

import { Provider } from "react-redux";
import { store } from "@/lib/store/store";
import { useEffect } from "react";
import { initializeWishlist } from "@/lib/store/wishlist-slice";
import { initializeCart } from "@/lib/store/cart-slice";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(initializeWishlist());
    store.dispatch(initializeCart());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}

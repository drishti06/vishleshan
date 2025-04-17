import { configureStore, combineReducers } from "@reduxjs/toolkit";
import wishlistReducer from "./wishlist-slice";
import cartReducer from "./cart-slice";
import { userSlice } from "./user-slice";
import { productSlice } from "./product/product-slice";

const appReducer = combineReducers({
  user: userSlice.reducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
  product: productSlice.reducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any
) => {
  if (action.type === "user/logout") {
    // preserve user slice, reset others by passing `undefined`
    state = {
      user: state?.user, // keep user as-is
    } as ReturnType<typeof appReducer> | undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

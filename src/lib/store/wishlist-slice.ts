import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./product/types";

interface WishlistState {
  items: Product[];
}

// Load initial state from localStorage if available
const loadInitialState = (): WishlistState => {
  if (typeof window !== "undefined") {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      return JSON.parse(savedWishlist);
    }
  }
  return { items: [] };
};

const initialState: WishlistState = { items: [] };

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    initializeWishlist: () => {
      return loadInitialState();
    },
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("wishlist", JSON.stringify(state));
        }
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },
    clearWishlist: (state) => {
      state.items = [];
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },
  },
});

export const {
  initializeWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

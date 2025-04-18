import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./product/types";

export interface CartItem {
  id: number;
  title: string;
  category: string;
  quantity: number | string;
  price: number | string;
}

interface CartState {
  items: Product[];
}

// Load initial state from localStorage if available
const loadInitialState = (): CartState => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  }
  return { items: [] };
};

const initialState: CartState = { items: [] };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initializeCart: (state) => {
      const loaded = loadInitialState();
      state.items = loaded.items;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].stock += action.payload.stock;
      } else {
        state.items.push(action.payload);
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{
        id: number;
        variant?: { color: string; size: string };
      }>
    ) => {
      state.items = state.items.filter(
        (item) => !(item.id === action.payload.id)
      );

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        id: number;
        quantity: number;
      }>
    ) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.items[itemIndex].stock = action.payload.quantity;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    clearCart: (state) => {
      state.items = [];

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
  },
});

export const {
  initializeCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

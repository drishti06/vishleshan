import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { dummyData } from "./data";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: dummyData,
  loading: false,
  error: null,
};

type AddProduct = {
  title: string;
  description: string;
  category: string;
  price: string | number;
  stock: string | number;
  images: string[];
};

export type Product = AddProduct & {
  id: string | number;
};

export const addProduct = createAsyncThunk<
  Product,
  AddProduct,
  { state: RootState; rejectValue: string }
>("products/addProduct", async (productData, { getState, rejectWithValue }) => {
  const { products } = getState().product;

  const isDuplicate = products.some(
    (product) => product.title.toLowerCase() === productData.title.toLowerCase()
  );

  if (isDuplicate) {
    return rejectWithValue("Product title must be unique.");
  }

  const newProduct = {
    ...productData,
    id: Date.now().toString(), // or use nanoid / uuid
  };

  return newProduct;
});

// FETCH ALL PRODUCTS (mock state-based fetch)
export const fetchProductsAsync = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("products/fetchProducts", async (_, { getState }) => {
  // Mocking a real API call: fetching directly from state.
  return getState().product.products;
});

// FETCH PRODUCT BY ID (mock state-based fetch)
export const fetchProductById = createAsyncThunk<
  Product | null,
  string,
  { state: RootState }
>("products/fetchProductById", async (id, { getState }) => {
  const { products } = getState().product;
  return products.find((p) => p.id === id) || null;
});

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload); // ⬅️ Push to state array
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add product.";
      })
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

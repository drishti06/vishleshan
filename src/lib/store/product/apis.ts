// src/lib/api/product-api.ts

import axios from "axios";
import { Product } from "./types";

const BASE_URL = "https://dummyjson.com"; // or your actual base URL

export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data.products;
};

export const fetchProductById = async (productId: string): Promise<Product> => {
  const response = await axios.get(`${BASE_URL}/api/products/get/${productId}`);
  return response.data;
};

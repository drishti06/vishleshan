export interface Product {
  id: string | number;
  title: string;
  description: string;
  category: string;
  price: string | number;
  stock: string | number;
  images: string[];
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string; // ISO date string (you can use `Date` if you parse it immediately)
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  barcode: string;
  qrCode: string;
}

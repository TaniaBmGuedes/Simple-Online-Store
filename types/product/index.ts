import type { Review } from "types/review";

export type Product = {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  category: string;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductDetail = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  tags: string[];
  images: string[];
  thumbnail: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  reviews: Review[];
};

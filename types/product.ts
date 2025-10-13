export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  features: string[];
  inStock: boolean;
  onSale: boolean;
  newArrival: boolean;
  brand: string;
}

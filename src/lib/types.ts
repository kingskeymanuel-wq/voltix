export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  badge?: string;
  dataAiHint: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'all' | 'smartphones' | 'laptops' | 'audio' | 'tv' | 'gaming' | 'accessories' | 'home';

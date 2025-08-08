
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

export interface Order {
  id: string;
  clientId?: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'validated' | 'shipped' | 'delivered' | 'cancelled';
  signature: string;
}

export interface SAVTicket {
  id: string;
  clientId: string;
  orderId: string;
  product: string;
  issue: string;
  status: 'Ouvert' | 'En cours' | 'Clôturé';
  date: string;
}

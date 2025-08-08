
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

export type Category = 'all' | 'smartphones' | 'laptops' | 'cameras' | 'drones' | 'gaming' | 'audio' | 'wearables' | 'accessories';


export interface Order {
  id: string;
  clientId?: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'validated' | 'preparing' | 'in_transit' | 'delivered' | 'cancelled';
  signature: string;
}

export interface SAVTicket {
    id: string;
    clientId: string;
    orderId: string;
    product: string;
    issue: string;
    status: 'Ouvert' | 'En cours' | 'Résolu' | 'Fermé';
    date: string;
}

export interface Ebook {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface EbookContent {
    id: string;
    chapters: {
        title: string;
        sections: {
            title: string;
            content: string;
        }[];
    }[];
}
    

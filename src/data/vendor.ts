import type { Order, SAVTicket } from '@/lib/types';

export const salesData = [
  { name: 'Jan', Ventes: 4000, Benefices: 2400 },
  { name: 'Fév', Ventes: 3000, Benefices: 1398 },
  { name: 'Mar', Ventes: 5000, Benefices: 7800 },
  { name: 'Avr', Ventes: 2780, Benefices: 3908 },
  { name: 'Mai', Ventes: 1890, Benefices: 4800 },
  { name: 'Jui', Ventes: 2390, Benefices: 3800 },
  { name: 'Jui', Ventes: 3490, Benefices: 4300 },
];

export const mockClients = [
    { id: 'USR-001', name: 'Ali Koné', email: 'ali.kone@example.com', phone: '+225 01234567', totalSpent: 1250000, lastOrder: '2024-05-10', status: 'Actif' },
    { id: 'USR-002', name: 'Fatou Cissé', email: 'fatou.c@example.com', phone: '+225 02345678', totalSpent: 850000, lastOrder: '2024-05-12', status: 'Actif' },
    { id: 'USR-003', name: 'Moussa Diarra', email: 'm.diarra@example.com', phone: '+225 03456789', totalSpent: 230000, lastOrder: '2023-11-20', status: 'Inactif' },
    { id: 'USR-004', name: 'Aïcha Traoré', email: 'a.traore@example.com', phone: '+225 04567890', totalSpent: 3500000, lastOrder: '2024-05-15', status: 'VIP' },
];

export const mockOrders: Order[] = [
    { id: 'VOLTIX-1234', clientId: 'USR-001', items: [{id: 'p1', name: 'iPhone 15 Pro Max', quantity:1, price: 850000, category: 's', image: 'https://images.unsplash.com/photo-1695026901844-f1737f374e6a?q=80&w=2670&auto=format&fit=crop', dataAiHint: '', description: ''}], total: 850000, date: '2024-05-10', status: 'delivered', signature: 'Ali Koné' },
    { id: 'VOLTIX-5678', clientId: 'USR-002', items: [{id: 'p13', name: 'AirPods Pro 2', quantity:1, price: 180000, category: 's', image: 'https://images.unsplash.com/photo-1694650523737-233454792039?q=80&w=2670&auto=format&fit=crop', dataAiHint: '', description: ''}], total: 180000, date: '2024-04-22', status: 'delivered', signature: 'Fatou Cissé' },
    { id: 'VOLTIX-9101', clientId: 'USR-001', items: [{id: 'p7', name: 'MacBook Pro 16" M3', quantity:1, price: 1200000, category: 's', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2526&auto=format&fit=crop', dataAiHint: '', description: ''}], total: 1200000, date: '2024-02-15', status: 'cancelled', signature: 'Ali Koné' },
    { id: 'VOLTIX-17212497', clientId: 'USR-004', date: '2024-07-17T20:56:12.981Z', total: 850000, status: 'validated', signature: 'Aïcha Traoré', items: [{ id: 'p1', name: 'iPhone 15 Pro Max', category: 'smartphones', price: 850000, image: 'https://images.unsplash.com/photo-1695026901844-f1737f374e6a?q=80&w=2670&auto=format&fit=crop', dataAiHint: "iphone pro", description: 'Le smartphone le plus avancé d\'Apple...', quantity: 1}] },
    { id: 'VOLTIX-17212423', clientId: 'USR-004', date: '2024-07-15T18:32:10.111Z', total: 1380000, status: 'delivered', signature: 'Aïcha Traoré', items: [{ id: 'p7', name: 'MacBook Pro 16" M3', category: 'laptops', price: 1200000, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2526&auto=format&fit=crop', dataAiHint: "macbook pro", description: 'Ordinateur portable professionnel...', quantity: 1}, { id: 'p13', name: 'AirPods Pro 2', category: 'audio', price: 180000, image: 'https://images.unsplash.com/photo-1694650523737-233454792039?q=80&w=2670&auto=format&fit=crop', dataAiHint: "airpods pro", description: 'Écouteurs sans fil...', quantity: 1}] },
];

export const initialSavTickets: SAVTicket[] = [
    { id: 'SAV-001', clientId: 'USR-001', orderId: 'VOLTIX-1234', product: 'iPhone 15 Pro Max', issue: 'Problème de batterie, ne tient pas la charge.', status: 'En cours', date: '2024-07-20' },
];

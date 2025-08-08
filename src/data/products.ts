
import type { Product } from '@/lib/types';

export const allProducts: Product[] = [
  {id: 'p1', name: 'iPhone 15 Pro Max', category: 'smartphones', price: 850000, image: 'https://images.unsplash.com/photo-1695026901844-f1737f374e6a?q=80&w=2670&auto=format&fit=crop', dataAiHint: "iphone pro", description: 'Le smartphone le plus avancé d\'Apple, avec une puce A17 Pro, un design en titane et le meilleur système photo sur un iPhone.'},
  {id: 'p2', name: 'Samsung Galaxy S24 Ultra', category: 'smartphones', price: 800000, image: 'https://images.unsplash.com/photo-1705149129598-f753b811786c?q=80&w=2670&auto=format&fit=crop', dataAiHint: "samsung galaxy", description: 'Découvrez la puissance de Galaxy AI. Zoomez avec le Space Zoom 200MP et éditez vos photos comme un pro.', badge: 'Nouveau'},
  {id: 'p3', name: 'Google Pixel 8 Pro', category: 'smartphones', price: 650000, image: 'https://images.unsplash.com/photo-1700693425575-b9f10928a385?q=80&w=2670&auto=format&fit=crop', dataAiHint: 'google pixel back', description: 'Photographie IA révolutionnaire, Android pur et mises à jour garanties 7 ans.', badge: 'IA'},
  
  {id: 'p4', name: 'DJI Mavic Air 3', category: 'drones', price: 950000, image: 'https://images.unsplash.com/photo-1688643812284-7fb7e8aa5917?q=80&w=2670&auto=format&fit=crop', dataAiHint: "dji drone", description: 'Double caméra 4K, détection d\'obstacles et une autonomie de 46 minutes pour des prises de vues aériennes époustouflantes.'},
  {id: 'p5', name: 'Sony Alpha 7 IV', category: 'cameras', price: 1500000, image: 'https://images.unsplash.com/photo-1678235284343-a61b45a3fe1e?q=80&w=2670&auto=format&fit=crop', dataAiHint: "sony camera", description: 'Le standard pour les créateurs de contenu. Capteur plein format 33MP, vidéo 4K 60p et un autofocus légendaire.'},
  {id: 'p6', name: 'GoPro HERO12 Black', category: 'cameras', price: 350000, image: 'https://images.unsplash.com/photo-1708847530462-95f2a1a84d43?q=80&w=2670&auto=format&fit=crop', dataAiHint: "gopro camera", description: 'Capturez l\'action avec une stabilisation HyperSmooth 6.0, des vidéos 5.3K et une conception étanche et robuste.', badge: 'Action'},
  
  {id: 'p7', name: 'MacBook Pro 16" M3', category: 'laptops', price: 1200000, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2526&auto=format&fit=crop', dataAiHint: "macbook pro", description: 'Une puissance et une efficacité énergétique qui changent la donne pour les professionnels de la création et du développement.'},
  {id: 'p8', name: 'Dell XPS 15', category: 'laptops', price: 1100000, image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2670&auto=format&fit=crop', dataAiHint: "dell laptop", description: 'Un écran InfinityEdge 4K spectaculaire et des performances de pointe dans un châssis élégant. Le meilleur de Windows.'},
  
  {id: 'p9', name: 'PlayStation 5 Slim', category: 'gaming', price: 450000, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2670&auto=format&fit=crop', dataAiHint: "playstation controller", description: 'Plongez dans des mondes immersifs avec des temps de chargement quasi-instantanés, un retour haptique et des graphismes 4K.', badge: 'Gaming'},
  {id: 'p10', name: 'Nintendo Switch OLED', category: 'gaming', price: 250000, image: 'https://images.unsplash.com/photo-1617096200347-cb04ae810b27?q=80&w=2670&auto=format&fit=crop', dataAiHint: "nintendo switch", description: 'Jouez à la maison ou en déplacement avec un écran OLED vibrant de 7 pouces. La console familiale par excellence.'},
  
  {id: 'p11', name: 'Apple Watch Ultra 2', category: 'wearables', price: 550000, image: 'https://images.unsplash.com/photo-1700588499252-710a37351657?q=80&w=2670&auto=format&fit=crop', dataAiHint: "apple watch", description: 'L\'Apple Watch la plus robuste et la plus performante jamais conçue. Pour les athlètes et les aventuriers.', badge: 'Aventure'},
  {id: 'p12', name: 'Samsung Galaxy Watch 6', category: 'wearables', price: 280000, image: 'https://images.unsplash.com/photo-1709324021001-2a1e0b507271?q=80&w=2670&auto=format&fit=crop', dataAiHint: "samsung watch", description: 'Suivi du sommeil, composition corporelle et un écosystème connecté pour une vie plus saine.'},
  
  {id: 'p13', name: 'AirPods Pro 2', category: 'audio', price: 180000, image: 'https://images.unsplash.com/photo-1694650523737-233454792039?q=80&w=2670&auto=format&fit=crop', dataAiHint: "airpods pro", description: 'Une réduction de bruit jusqu\'à 2x plus efficace, un mode Transparence adaptatif et un son immersif.'},
  {id: 'p14', name: 'Sony WH-1000XM5', category: 'audio', price: 250000, image: 'https://images.unsplash.com/photo-1659974538848-971715102a9a?q=80&w=2670&auto=format&fit=crop', dataAiHint: "sony headphones", description: 'Le meilleur casque à réduction de bruit du marché. Un silence inégalé et un son Hi-Res Audio.'},
];

export const categories = [
  { key: 'all', name: 'Tous les produits' },
  { key: 'smartphones', name: 'Smartphones' },
  { key: 'laptops', name: 'Laptops' },
  { key: 'cameras', name: 'Appareils Photo' },
  { key: 'drones', name: 'Drones' },
  { key: 'gaming', name: 'Gaming' },
  { key: 'audio', name: 'Audio' },
  { key: 'wearables', name: 'Objets Connectés' },
  { key: 'accessories', name: 'Accessoires' },
] as const;

export const getCategoryName = (key: string) => {
  const category = categories.find(c => c.key === key);
  return category ? category.name : key;
};


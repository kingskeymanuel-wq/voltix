
import type { Product } from '@/lib/types';

export const allProducts: Product[] = [
  // Ancien Testament
  {id: 'p1', name: 'La Création du Monde', category: 'genesis', price: 0, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop', dataAiHint: "galaxy stars earth", description: "Découvrez comment Dieu a créé les cieux, la terre, et tout ce qui s'y trouve en six jours.", badge: 'Dieu, Adam, Ève'},
  {id: 'p2', name: "L'Arche de Noé", category: 'genesis', price: 0, image: 'https://images.unsplash.com/photo-1578026383637-ff2b97c2a4ee?q=80&w=2574&auto=format&fit=crop', dataAiHint: "wooden ark boat", description: "Vivez le déluge et la construction de l'arche qui a sauvé Noé, sa famille et les animaux.", badge: 'Noé'},
  {id: 'p3', name: "La Tour de Babel", category: 'genesis', price: 0, image: 'https://images.unsplash.com/photo-1604580864964-69a3fb4d483c?q=80&w=2669&auto=format&fit=crop', dataAiHint: "ancient tower sky", description: "Comprenez pourquoi l'humanité a été dispersée et les langues confondues.", badge: 'Humanité'},
  {id: 'p4', name: 'David contre Goliath', category: 'prophets', price: 0, image: 'https://images.unsplash.com/photo-1531627854668-7a5732a344d6?q=80&w=2670&auto=format&fit=crop', dataAiHint: "shepherd giant valley", description: "Assistez au combat légendaire entre le jeune berger David et le géant philistin Goliath.", badge: 'David, Goliath'},
  {id: 'p5', name: 'La Sagesse de Salomon', category: 'prophets', price: 0, image: 'https://images.unsplash.com/photo-1610623379963-782f254f15e0?q=80&w=2670&auto=format&fit=crop', dataAiHint: "king throne gold", description: 'Explorez les jugements et les proverbes du roi le plus sage d\'Israël.', badge: 'Salomon'},
  {id: 'p6', name: 'Daniel dans la fosse aux lions', category: 'prophets', price: 0, image: 'https://images.unsplash.com/photo-1620932930214-7e8d8a7b8b78?q=80&w=2574&auto=format&fit=crop', dataAiHint: "man lions den", description: 'La foi inébranlable de Daniel est mise à l\'épreuve face à des lions affamés.', badge: 'Daniel'},
  
  // Nouveau Testament
  {id: 'p7', name: 'La Naissance de Jésus', category: 'gospels', price: 0, image: 'https://images.unsplash.com/photo-1577583621469-5a1a1f0d3b6f?q=80&w=2670&auto=format&fit=crop', dataAiHint: "nativity scene manger", description: 'Célébrez la naissance du Sauveur à Bethléem, annoncée par les anges et visitée par les mages.', badge: 'Jésus, Marie, Joseph'},
  {id: 'p8', name: 'Le Sermon sur la Montagne', category: 'gospels', price: 0, image: 'https://images.unsplash.com/photo-1508285194520-d9964b734685?q=80&w=2670&auto=format&fit=crop', dataAiHint: "man speaking mountain", description: 'Écoutez les enseignements les plus profonds de Jésus, y compris les Béatitudes.', badge: 'Jésus'},
  {id: 'p9', name: 'La Multiplication des Pains', category: 'gospels', price: 0, image: 'https://images.unsplash.com/photo-1601600475681-365793012e8b?q=80&w=2670&auto=format&fit=crop', dataAiHint: "bread fish crowd", description: 'Voyez comment Jésus a nourri une foule de 5000 personnes avec seulement cinq pains et deux poissons.', badge: 'Jésus'},
  {id: 'p10', name: 'La Résurrection de Lazare', category: 'gospels', price: 0, image: 'https://images.unsplash.com/photo-1594791024842-a8188171092e?q=80&w=2670&auto=format&fit=crop', dataAiHint: "tomb light resurrection", description: 'Assistez à l\'un des miracles les plus spectaculaires de Jésus, ramenant son ami Lazare à la vie.', badge: 'Jésus, Lazare'},
  {id: 'p11', name: 'La Crucifixion et la Résurrection', category: 'gospels', price: 0, image: 'https://images.unsplash.com/photo-1518552399925-f078a8e105a3?q=80&w=2670&auto=format&fit=crop', dataAiHint: "three crosses hill", description: "Le sacrifice ultime et la victoire sur la mort, le fondement de la foi chrétienne.", badge: 'Jésus'},
  {id: 'p12', name: 'La Conversion de Paul', category: 'acts', price: 0, image: 'https://images.unsplash.com/photo-1615288510831-240134f197b8?q=80&w=2670&auto=format&fit=crop', dataAiHint: "man road light", description: "Découvrez comment Saul de Tarse, persécuteur de chrétiens, est devenu l'apôtre Paul.", badge: 'Paul'},
];

export const categories = [
  { key: 'all', name: 'Toutes les Aventures' },
  { key: 'genesis', name: 'Genèse' },
  { key: 'prophets', name: 'Prophètes & Rois' },
  { key: 'gospels', name: 'Évangiles' },
  { key: 'acts', name: 'Actes des Apôtres' },
] as const;

export const getCategoryName = (key: string) => {
  const category = categories.find(c => c.key === key);
  return category ? category.name : key;
};

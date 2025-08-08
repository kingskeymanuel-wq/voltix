import type { Product } from '@/lib/types';

export const allProducts: Product[] = [
  // Page 1 - Smartphones & Tablettes
  {id: 'p1', name: 'iPhone 15 Pro Max', category: 'smartphones', price: 850000, image: 'https://images.unsplash.com/photo-1695026901844-f1737f374e6a?q=80&w=2670&auto=format&fit=crop', dataAiHint: "iphone pro", description: 'Le smartphone le plus avancé d\'Apple avec puce A17 Pro, appareil photo 48MP et écran Super Retina XDR 6.7".', badge: 'Nouveau'},
  {id: 'p2', name: 'Samsung Galaxy S24 Ultra', category: 'smartphones', price: 780000, image: 'https://images.unsplash.com/photo-1705522363989-4e5b9e4a3c75?q=80&w=2574&auto=format&fit=crop', dataAiHint: "samsung galaxy", description: 'Smartphone Android premium avec S Pen intégré, zoom 100x et intelligence artificielle Galaxy AI avancée.', badge: 'Populaire'},
  {id: 'p3', name: 'Google Pixel 8 Pro', category: 'smartphones', price: 650000, image: 'https://images.unsplash.com/photo-1700693425575-b9f10928a385?q=80&w=2670&auto=format&fit=crop', dataAiHint: "google pixel", description: 'Photographie IA révolutionnaire, Android pur et mises à jour garanties 7 ans.', badge: 'IA'},
  {id: 'p4', name: 'iPad Pro 12.9" M2', category: 'smartphones', price: 720000, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2564&auto=format&fit=crop', dataAiHint: "ipad pro", description: 'Tablette professionnelle avec puce M2, écran Liquid Retina XDR et compatibilité Apple Pencil.', badge: 'Pro'},
  {id: 'p5', name: 'OnePlus 12', category: 'smartphones', price: 580000, image: 'https://images.unsplash.com/photo-1608668609823-d34e9124a919?q=80&w=2574&auto=format&fit=crop', dataAiHint: "oneplus phone", description: 'Performance flagship avec Snapdragon 8 Gen 3, charge ultra-rapide 100W et écran 120Hz.', badge: 'Rapide'},
  {id: 'p6', name: 'Xiaomi 14 Ultra', category: 'smartphones', price: 520000, image: 'https://images.unsplash.com/photo-1621213271738-9b8e8b1b5e1a?q=80&w=2574&auto=format&fit=crop', dataAiHint: "xiaomi phone", description: 'Photographie professionnelle avec capteur Leica, design premium et rapport qualité-prix exceptionnel.', badge: 'Photo'},

  // Page 2 - Ordinateurs & Gaming
  {id: 'p7', name: 'MacBook Pro 16" M3', category: 'laptops', price: 1200000, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2526&auto=format&fit=crop', dataAiHint: "macbook pro", description: 'Ordinateur portable professionnel avec puce M3, écran Liquid Retina XDR et autonomie exceptionnelle de 22h.', badge: 'Pro'},
  {id: 'p8', name: 'Dell XPS 15 OLED', category: 'laptops', price: 950000, image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2670&auto=format&fit=crop', dataAiHint: "dell laptop", description: 'PC portable haut de gamme avec écran OLED 4K, processeur Intel i7-13700H et carte graphique RTX 4060.', badge: 'OLED'},
  {id: 'p9', name: 'ASUS ROG Strix G18', category: 'gaming', price: 1100000, image: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?q=80&w=2574&auto=format&fit=crop', dataAiHint: "gaming laptop", description: 'PC gaming ultime avec RTX 4080, écran 240Hz, refroidissement avancé et RGB personnalisable.', badge: 'Gaming'},
  {id: 'p10', name: 'Microsoft Surface Studio', category: 'laptops', price: 1350000, image: 'https://images.unsplash.com/photo-1664403308259-399c43b596f2?q=80&w=2532&auto=format&fit=crop', dataAiHint: "microsoft surface", description: 'Station créative tout-en-un avec écran tactile 28", Surface Pen et performance professionnelle.', badge: 'Créatif'},
  {id: 'p11', name: 'Alienware Aurora R15', category: 'gaming', price: 1450000, image: 'https://images.unsplash.com/photo-1593152166613-242e47c7c398?q=80&w=2670&auto=format&fit=crop', dataAiHint: "gaming desktop", description: 'PC gaming desktop avec RTX 4090, processeur i9, refroidissement liquide et design futuriste.', badge: 'Ultime'},
  {id: 'p12', name: 'Lenovo ThinkPad X1 Carbon', category: 'laptops', price: 850000, image: 'https://images.unsplash.com/photo-1610943418243-73f16016b116?q=80&w=2574&auto=format&fit=crop', dataAiHint: "lenovo thinkpad", description: 'Ultrabook professionnel ultra-léger, sécurité enterprise et autonomie 15h pour les nomades.', badge: 'Business'},

  // Page 3 - Audio, TV & Maison Connectée
  {id: 'p13', name: 'AirPods Pro 2', category: 'audio', price: 180000, image: 'https://images.unsplash.com/photo-1694650523737-233454792039?q=80&w=2670&auto=format&fit=crop', dataAiHint: "airpods pro", description: 'Écouteurs sans fil avec réduction de bruit active adaptative et audio spatial personnalisé avec puce H2.', badge: 'Nouveau'},
  {id: 'p14', name: 'Sony WH-1000XM5', category: 'audio', price: 220000, image: 'https://images.unsplash.com/photo-1673102454689-56d15878d6b1?q=80&w=2670&auto=format&fit=crop', dataAiHint: "sony headphones", description: 'Casque premium avec la meilleure réduction de bruit du marché, autonomie 30h et qualité audio Hi-Res.', badge: 'Premium'},
  {id: 'p15', name: 'Samsung Neo QLED 65"', category: 'tv', price: 1100000, image: 'https://images.unsplash.com/photo-1593784999539-3972104b3164?q=80&w=2574&auto=format&fit=crop', dataAiHint: "samsung tv", description: 'Smart TV 4K avec technologie Quantum Dot, HDR10+ et processeur Neural Quantum 4K pour une image parfaite.', badge: 'Smart'},
  {id: 'p16', name: 'LG OLED C3 77"', category: 'tv', price: 1350000, image: 'https://images.unsplash.com/photo-1628189540097-a72a4c18a287?q=80&w=2574&auto=format&fit=crop', dataAiHint: "lg oled", description: 'TV OLED premium avec pixels auto-éclairés, Dolby Vision IQ et webOS smart platform.', badge: 'OLED'},
  {id: 'p17', name: 'Apple Watch Ultra 2', category: 'accessories', price: 480000, image: 'https://images.unsplash.com/photo-1694650523701-df232c45e5a2?q=80&w=2670&auto=format&fit=crop', dataAiHint: "apple watch", description: 'Montre connectée ultra-résistante avec GPS précis, plongée jusqu\'à 100m et autonomie 36h.', badge: 'Sport'},
  {id: 'p18', name: 'Amazon Echo Studio', category: 'home', price: 180000, image: 'https://images.unsplash.com/photo-1605353163351-b54f67a213a8?q=80&w=2574&auto=format&fit=crop', dataAiHint: "smart speaker", description: 'Enceinte intelligente avec son 3D immersif, Alexa intégrée et contrôle domotique avancé.', badge: 'Smart'},

  // Page 4 - Plus de produits gaming et accessoires
  {id: 'p19', name: 'PlayStation 5 Pro', category: 'gaming', price: 650000, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2670&auto=format&fit=crop', dataAiHint: "playstation console", description: 'Console next-gen avec ray tracing, SSD ultra-rapide et manette DualSense haptique.', badge: 'Console'},
  {id: 'p20', name: 'Xbox Series X', category: 'gaming', price: 580000, image: 'https://images.unsplash.com/photo-1621259182962-a151634b35b6?q=80&w=2670&auto=format&fit=crop', dataAiHint: "xbox console", description: 'Console 4K avec 12 TFLOPS, Quick Resume et Game Pass Ultimate inclus.', badge: 'Gaming'},
  {id: 'p21', name: 'Nintendo Switch OLED', category: 'gaming', price: 280000, image: 'https://images.unsplash.com/photo-1654877757938-b72f44a7f6a3?q=80&w=2670&auto=format&fit=crop', dataAiHint: "nintendo switch", description: 'Console hybride avec écran OLED 7", dock amélioré et jeux exclusifs Nintendo.', badge: 'Portable'},
  {id: 'p22', name: 'Bose QuietComfort Ultra', category: 'audio', price: 320000, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670&auto=format&fit=crop', dataAiHint: "bose headphones", description: 'Casque premium avec réduction de bruit immersive et audio spatial Bose.', badge: 'Immersif'},
  {id: 'p23', name: 'DJI Mini 4 Pro', category: 'accessories', price: 750000, image: 'https://images.unsplash.com/photo-1604990812739-497d519d443d?q=80&w=2574&auto=format&fit=crop', dataAiHint: "dji drone", description: 'Drone compact 4K avec détection d\'obstacles omnidirectionnelle et transmission 20km.', badge: 'Drone'},
  {id: 'p24', name: 'Tesla Powerwall', category: 'home', price: 2200000, image: 'https://images.unsplash.com/photo-1629471183100-a6493f4e3a47?q=80&w=2670&auto=format&fit=crop', dataAiHint: "home battery", description: 'Batterie domestique intelligente pour stockage d\'énergie solaire et backup électrique.', badge: 'Énergie'},

  // Nouveaux produits ajoutés
  {id: 'p25', name: 'Projecteur Cinéma 4K VOLTIX', category: 'accessories', price: 250000, image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=2670&auto=format&fit=crop', dataAiHint: "video projector", description: 'Transformez votre salon en salle de cinéma avec ce projecteur 4K UHD. Luminosité incroyable et couleurs vives.', badge: 'Cinéma'},
  {id: 'p26', name: 'Caméra Solaire 360° VOLTIX', category: 'home', price: 120000, image: 'https://images.unsplash.com/photo-1622959828238-958434a98059?q=80&w=2670&auto=format&fit=crop', dataAiHint: "solar camera", description: 'Surveillance autonome avec énergie solaire. Angle de vue 360°, vision nocturne et détection de mouvement.', badge: 'Éco'},
  {id: 'p27', name: 'Caméra Intérieure Wi-Fi VOLTIX', category: 'home', price: 65000, image: 'https://images.unsplash.com/photo-1598428886364-386617fc6492?q=80&w=2532&auto=format&fit=crop', dataAiHint: "indoor camera", description: 'Gardez un oeil sur votre domicile avec cette caméra Wi-Fi. Audio bi-directionnel et alertes sur smartphone.', badge: 'Sécurité'},
  {id: 'p28', name: 'Caméra Extérieure Pro VOLTIX', category: 'home', price: 95000, image: 'https://images.unsplash.com/photo-1563293998-c6991a2713e7?q=80&w=2670&auto=format&fit=crop', dataAiHint: "outdoor camera", description: 'Caméra de surveillance robuste pour l\'extérieur. Résistante aux intempéries (IP67), 4K et vision nocturne couleur.', badge: 'Robuste'}
];

export const categories = [
  { key: 'all', name: 'Tous' },
  { key: 'smartphones', name: 'Smartphones' },
  { key: 'laptops', name: 'Ordinateurs' },
  { key: 'audio', name: 'Audio' },
  { key: 'tv', name: 'TV & Écrans' },
  { key: 'gaming', name: 'Gaming' },
  { key: 'accessories', name: 'Accessoires' },
  { key: 'home', name: 'Maison Connectée' },
] as const;

export const getCategoryName = (key: string) => {
  const category = categories.find(c => c.key === key);
  return category ? category.name : key;
};

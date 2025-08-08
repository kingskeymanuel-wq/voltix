
"use client"

import * as React from "react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { CartSheet } from "@/components/cart-sheet";
import { ContactModal } from "@/components/contact-modal";
import { VoltyAssistant } from "@/components/volty-assistant";
import { allProducts, getCategoryName } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Share2, ShieldCheck, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProductCard } from "@/components/product-card";
import type { Product, CartItem } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";

function ProductDetailContent({ product }: { product: Product }) {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const router = useRouter();
  const { toast } = useToast();
  
  const [wishlist, setWishlist] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    const storedWishlist = localStorage.getItem('voltix-wishlist');
    if (storedWishlist) {
        setWishlist(new Set(JSON.parse(storedWishlist)));
    }
  }, []);

  const toggleWishlist = React.useCallback((productId: string) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
        toast({ title: "Retiré des favoris" });
    } else {
        newWishlist.add(productId);
        toast({ title: "Ajouté aux favoris !" });
    }
    setWishlist(newWishlist);
    localStorage.setItem('voltix-wishlist', JSON.stringify(Array.from(newWishlist)));
     // Dispatch storage event to sync other components
    window.dispatchEvent(new Event('storage'));
  }, [wishlist, toast]);

  const addToCart = React.useCallback((product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    toast({
      title: `${product.name} ajouté !`,
      description: "Votre panier a été mis à jour.",
    });
    setIsCartOpen(true);
  }, [toast]);
  
  const updateCartQuantity = React.useCallback((id: string, quantity: number) => {
    setCartItems(prev => {
        if (quantity <= 0) {
            return prev.filter(item => item.id !== id);
        }
        return prev.map(item => item.id === id ? {...item, quantity} : item);
    })
  }, []);

  const removeFromCart = React.useCallback((id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearCart = React.useCallback(() => {
    setCartItems([]);
  }, []);

  const cartTotal = React.useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const cartCount = React.useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const similarProducts = React.useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 3);
  }, [product]);

  const handleShare = () => {
    if(navigator.share) {
        navigator.share({
            title: product.name,
            text: `Découvrez le ${product.name} sur VOLTIX SMART !`,
            url: window.location.href
        }).then(() => {
            toast({ title: 'Produit partagé !' });
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(window.location.href);
        toast({ title: 'Lien copié !', description: 'Le lien du produit a été copié dans le presse-papiers.' });
    }
  }

  const isWishlisted = wishlist.has(product.id);

  return (
     <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-black to-gray-900/80">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onContactClick={() => setIsContactModalOpen(true)}
        searchTerm=""
        setSearchTerm={() => {}}
      />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl shadow-primary/10">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    data-ai-hint={product.dataAiHint}
                />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            </div>

            <div className="space-y-6">
                <p className="text-sm font-bold uppercase text-primary tracking-wider">{getCategoryName(product.category)}</p>
                <h1 className="text-4xl md:text-5xl font-black font-headline text-white">{product.name}</h1>
                <p className="text-5xl font-black text-primary font-code">{product.price.toLocaleString('fr-FR')} FCFA</p>
                <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
                
                <div className="flex gap-4">
                    <Button onClick={() => addToCart(product)} size="lg" className="w-full font-bold text-lg p-7 bg-gradient-to-r from-primary to-blue-600 text-white hover:scale-105 transition-transform duration-300">
                      <ShoppingCart className="mr-3"/>
                      Ajouter au Panier
                    </Button>
                    <Button 
                        variant="outline" 
                        size="lg" 
                        className="border-2 border-primary/30 text-primary hover:bg-primary/20 hover:border-primary transition-colors p-7 data-[active=true]:bg-primary/20"
                        data-active={isWishlisted}
                        onClick={() => toggleWishlist(product.id)}
                    >
                        <Heart className={isWishlisted ? "fill-current" : ""}/>
                    </Button>
                </div>

                <div className="p-4 bg-secondary/30 rounded-lg space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                        <ShieldCheck className="text-green-400" />
                        <span>Garantie internationale 12 mois</span>
                    </div>
                     <div className="flex items-center gap-3 text-sm">
                        <Zap className="text-yellow-400" />
                        <span>Livraison express 24h sur Abidjan</span>
                    </div>
                </div>

                <Button onClick={handleShare} variant="link" className="text-muted-foreground"><Share2 className="mr-2"/> Partager ce produit</Button>
            </div>
        </div>

        {similarProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-bold font-headline text-center mb-12">Produits Similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProducts.map((p, index) => (
                <ProductCard 
                    key={p.id} 
                    product={p} 
                    addToCart={addToCart} 
                    index={index}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          </div>
        )}

      </main>
      <CartSheet
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        cartItems={cartItems}
        cartTotal={cartTotal}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        addToCart={addToCart}
      />
      <ContactModal isOpen={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
      <VoltyAssistant />

      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="group relative flex items-center justify-center gap-4 rounded-full bg-gradient-to-r from-primary to-blue-600 px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-primary/40"
            >
              <ShoppingCart />
              <span>Voir le panier ({cartCount})</span>
              <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                {cartCount}
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = allProducts.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailContent product={product} />;
}

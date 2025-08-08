
"use client"

import * as React from "react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { ContactBar } from "@/components/contact-bar";
import { ContactModal } from "@/components/contact-modal";
import { allProducts, getCategoryName } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { useToast } from "@/hooks/use-toast";
import type { CartItem, Product } from "@/lib/types";
import { CartSheet } from "@/components/cart-sheet";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const product = allProducts.find(p => p.id === params.id);

  const similarProducts = React.useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 3);
  }, [product]);

  const addToCart = React.useCallback((productToAdd: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productToAdd.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...productToAdd, quantity: 1 }];
    });
    toast({
      title: "Ajouté au panier!",
      description: `${productToAdd.name} a été ajouté à votre panier.`,
    });
  }, [toast]);

  const updateCartQuantity = React.useCallback((productId: string, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter((item) => item.id !== productId);
      }
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const removeFromCart = React.useCallback((productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const clearCart = React.useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = React.useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartTotal = React.useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);


  if (!product) {
    notFound();
  }

  return (
     <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-black to-gray-900/80">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onContactClick={() => setIsContactModalOpen(true)}
        searchTerm=""
        setSearchTerm={(term) => {
          // Redirect to home page with search term
          router.push(`/?search=${term}`);
        }}
      />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl shadow-primary/10">
                <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="animate-glow"
                    data-ai-hint={product.dataAiHint}
                />
            </div>

            <div className="space-y-6">
                <p className="text-sm font-bold uppercase text-primary tracking-wider">{getCategoryName(product.category)}</p>
                <h1 className="text-4xl md:text-5xl font-black text-white">{product.name}</h1>
                <p className="text-5xl font-black text-primary">{product.price.toLocaleString('fr-FR')} FCFA</p>
                <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
                
                <div className="flex gap-4">
                    <Button onClick={() => addToCart(product)} size="lg" className="w-full font-bold text-lg p-7 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground hover:scale-105 transition-transform duration-300">
                      <ShoppingCart className="mr-3"/>
                      Ajouter au panier
                    </Button>
                    <Button variant="outline" size="lg" className="border-2 border-primary/30 text-primary hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 transition-colors p-7">
                      <Heart />
                    </Button>
                </div>
            </div>
        </div>

        {similarProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-12">Produits Similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} addToCart={addToCart} index={index} />
              ))}
            </div>
          </div>
        )}

      </main>
      <ContactBar onContactClick={() => setIsContactModalOpen(true)} />
      <ContactModal isOpen={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
      <CartSheet
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        cartItems={cart}
        cartTotal={cartTotal}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        addToCart={addToCart}
      />
    </div>
  );
}


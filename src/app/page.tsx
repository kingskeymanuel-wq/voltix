
"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProductsSection } from "@/components/products-section";
import { CartSheet } from "@/components/cart-sheet";
import { ContactBar } from "@/components/contact-bar";
import { ContactModal } from "@/components/contact-modal";
import { VoltyAssistant } from "@/components/volty-assistant";
import { useToast } from "@/hooks/use-toast";
import type { Product, CartItem } from "@/lib/types";
import { allProducts as initialProducts } from "@/data/products";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";


function HomePageContent() {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const [products, setProducts] = React.useState<Product[]>([]);
  
  const { toast } = useToast();

  React.useEffect(() => {
    // Initial load from localStorage or fall back to initialProducts
    const storedProducts = localStorage.getItem('voltix-products');
    const currentProducts = storedProducts ? JSON.parse(storedProducts) : initialProducts;
    setProducts(currentProducts);

    // Listen for storage changes to update products across tabs/pages
    const handleStorageChange = () => {
        const updatedStoredProducts = localStorage.getItem('voltix-products');
        setProducts(updatedStoredProducts ? JSON.parse(updatedStoredProducts) : initialProducts);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-black to-gray-900/80">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onContactClick={() => setIsContactModalOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main className="flex-1">
        <Hero onContactClick={() => setIsContactModalOpen(true)} />
        <ProductsSection allProducts={products} addToCart={addToCart} searchTerm={searchTerm} />
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
      <ContactBar onContactClick={() => setIsContactModalOpen(true)} />
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

export default function Home() {
  return (
    <React.Suspense fallback={<div>Chargement...</div>}>
      <HomePageContent />
    </React.Suspense>
  )
}

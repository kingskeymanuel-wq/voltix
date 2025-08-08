
"use client";

import * as React from "react";
import { useSearchParams } from 'next/navigation'
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProductsSection } from "@/components/products-section";
import { CartSheet } from "@/components/cart-sheet";
import { ContactModal } from "@/components/contact-modal";
import { ContactBar } from "@/components/contact-bar";
import { VoltyAssistant } from "@/components/volty-assistant";
import type { CartItem, Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { allProducts as initialProducts } from "@/data/products";

function HomePageContent() {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = React.useState(searchParams.get('search') || "");
  
  const [products, setProducts] = React.useState<Product[]>(initialProducts);

  const { toast } = useToast();

  React.useEffect(() => {
    // This effect ensures that product list updates from the vendor page
    // are reflected on the home page.
    const handleStorageChange = () => {
      const updatedProducts = localStorage.getItem('voltix-products');
      if (updatedProducts) {
        try {
            setProducts(JSON.parse(updatedProducts));
        } catch(e) {
            console.error("Failed to parse products from localStorage", e);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange(); // Initial load
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addToCart = React.useCallback((product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast({
      title: "Ajouté au panier!",
      description: `${product.name} a été ajouté à votre panier.`,
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

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onContactClick={() => setIsContactModalOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main className="flex-1">
        <Hero />
        <ProductsSection allProducts={products} addToCart={addToCart} searchTerm={searchTerm} />
      </main>
      <ContactBar onContactClick={() => setIsContactModalOpen(true)} />
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
      <ContactModal isOpen={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
      <VoltyAssistant addToCart={addToCart} />
    </div>
  );
}

export default function Home() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </React.Suspense>
  )
}

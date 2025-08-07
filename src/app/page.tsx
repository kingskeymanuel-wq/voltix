"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProductsSection } from "@/components/products-section";
import { CartSheet } from "@/components/cart-sheet";
import { ContactModal } from "@/components/contact-modal";
import { ContactBar } from "@/components/contact-bar";
import { VoltyAssistant } from "@/components/volty-assistant";
import type { CartItem, Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [_, setUser] = React.useState(null); // Used to force re-render on storage change

  const { toast } = useToast();

  React.useEffect(() => {
    const handleStorageChange = () => {
      const userFirstName = localStorage.getItem('userFirstName');
      // A bit of a hack to force re-render of components that depend on this state
      // @ts-ignore
      setUser(userFirstName);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addToCart = React.useCallback((product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === product.name
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

  const updateCartQuantity = React.useCallback((productName: string, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter((item) => item.name !== productName);
      }
      return prevCart.map((item) =>
        item.name === productName ? { ...item, quantity } : item
      );
    });
  }, []);

  const removeFromCart = React.useCallback((productName: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== productName));
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
      <ContactBar onContactClick={() => setIsContactModalOpen(true)} />
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onContactClick={() => setIsContactModalOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main className="flex-1">
        <Hero />
        <ProductsSection addToCart={addToCart} searchTerm={searchTerm} />
      </main>
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

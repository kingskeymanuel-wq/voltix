
"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProductsSection } from "@/components/products-section";
import { ContactModal } from "@/components/contact-modal";
import { VoltyAssistant } from "@/components/volty-assistant";
import type { Product } from "@/lib/types";
import { allProducts as initialProducts } from "@/data/products";

function HomePageContent() {
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  
  const [products, setProducts] = React.useState<Product[]>(initialProducts);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header
        onContactClick={() => setIsContactModalOpen(true)}
      />
      <main className="flex-1">
        <Hero />
        <ProductsSection allProducts={products} />
      </main>
      <ContactModal isOpen={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
      <VoltyAssistant />
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

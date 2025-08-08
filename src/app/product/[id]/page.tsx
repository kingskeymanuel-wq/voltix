
"use client"

import * as React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { ContactModal } from "@/components/contact-modal";
import { allProducts, getCategoryName } from "@/data/products";
import { Button } from "@/components/ui/button";
import { BookMarked } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";

function ProductDetailContent({ product }: { product: Product }) {
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);

  const similarProducts = React.useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 3);
  }, [product]);


  return (
     <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-background to-black/80">
      <Header
        onContactClick={() => setIsContactModalOpen(true)}
      />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl shadow-primary/10">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    objectFit="cover"
                    className="animate-glow"
                    data-ai-hint={product.dataAiHint}
                />
            </div>

            <div className="space-y-6">
                <p className="text-sm font-bold uppercase text-primary tracking-wider">{getCategoryName(product.category)}</p>
                <h1 className="text-4xl md:text-5xl font-black font-headline text-white">{product.name}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
                
                <div className="flex gap-4">
                    <Button size="lg" className="w-full font-bold text-lg p-7 bg-gradient-to-r from-primary to-yellow-600 text-primary-foreground hover:scale-105 transition-transform duration-300">
                      <BookMarked className="mr-3"/>
                      Lancer l'aventure interactive
                    </Button>
                </div>

                <div className="p-4 bg-card/50 rounded-lg space-y-2">
                    <h3 className="font-bold text-primary">Points Clés de l'Histoire</h3>
                    <ul className="list-disc list-inside text-muted-foreground">
                        <li>Personnages principaux : {product.badge}</li>
                        <li>Thème central : Sagesse, Foi, Courage...</li>
                        <li>Leçon à retenir : La confiance en Dieu.</li>
                    </ul>
                </div>
            </div>
        </div>

        {similarProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-bold font-headline text-center mb-12">Autres Aventures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        )}

      </main>
      <ContactModal isOpen={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
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

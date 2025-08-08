
"use client";

import * as React from "react";
import { categories } from "@/data/products";
import { ProductCard } from "./product-card";
import { Button } from "./ui/button";
import type { Category, Product } from "@/lib/types";
import { SearchX } from "lucide-react";

interface ProductsSectionProps {
  allProducts: Product[];
}

export const ProductsSection = ({ allProducts }: ProductsSectionProps) => {
  const [activeFilter, setActiveFilter] = React.useState<Category>('all');

  const filteredProducts = React.useMemo(() => {
    let products = allProducts;
    
    if (activeFilter !== 'all') {
      products = products.filter((p) => p.category === activeFilter);
    }
    
    return products;
  }, [activeFilter, allProducts]);


  const handleFilterChange = (category: Category) => {
    setActiveFilter(category);
  };
  
  return (
    <section id="adventures" className="py-24 bg-gradient-to-b from-background to-black/80">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-black font-headline text-center mb-4">Les Grandes Aventures</h2>
        <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Choisissez une histoire et plongez dans une expérience interactive et éducative.
        </p>

        <div className="flex justify-center flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat.key}
                onClick={() => handleFilterChange(cat.key as Category)}
                variant={activeFilter === cat.key ? "default" : "outline"}
                className={`rounded-full px-6 py-2 transition-all duration-300 ${activeFilter === cat.key ? 'bg-primary text-primary-foreground border-primary' : 'border-primary/30 text-primary bg-background/50 hover:bg-primary/10 hover:text-primary'}`}
              >
                {cat.name}
              </Button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
          ) : (
             <div className="col-span-full flex flex-col items-center justify-center text-center text-muted-foreground py-20">
                <SearchX size={64} className="mb-4 text-primary/50"/>
                <h3 className="text-2xl font-bold text-foreground mb-2">Aucune aventure trouvée</h3>
                <p>Explorez nos autres catégories pour commencer votre voyage.</p>
             </div>
          )}
        </div>
      </div>
    </section>
  );
};

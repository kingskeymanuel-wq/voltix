
"use client";

import * as React from "react";
import { categories } from "@/data/products";
import { ProductCard } from "./product-card";
import { Button } from "./ui/button";
import type { Category, Product } from "@/lib/types";
import { SearchX } from "lucide-react";

interface ProductsSectionProps {
  addToCart: (product: Product) => void;
  searchTerm: string;
  allProducts: Product[];
}

const PRODUCTS_PER_PAGE = 6;

export const ProductsSection = ({ allProducts, addToCart, searchTerm }: ProductsSectionProps) => {
  const [activeFilter, setActiveFilter] = React.useState<Category>('all');
  const [currentPage, setCurrentPage] = React.useState(1);

  const filteredProducts = React.useMemo(() => {
    let products = allProducts;
    
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(lowercasedTerm) ||
        p.description.toLowerCase().includes(lowercasedTerm) ||
        p.category.toLowerCase().includes(lowercasedTerm)
      );
    } else if (activeFilter !== 'all') {
      products = products.filter((p) => p.category === activeFilter);
    }
    
    return products;
  }, [searchTerm, activeFilter, allProducts]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = React.useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleFilterChange = (category: Category) => {
    setActiveFilter(category);
    setCurrentPage(1);
  };
  
  const handlePageChange = (direction: number) => {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter]);

  return (
    <section id="products" className="py-24 bg-gradient-to-b from-black to-gray-900/80">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-4">Catalogue Premium</h2>
        <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Découvrez notre sélection exclusive de matériel électronique haut de gamme avec garantie internationale.
        </p>

        {!searchTerm && (
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
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} index={index} />
            ))
          ) : (
             <div className="col-span-full flex flex-col items-center justify-center text-center text-muted-foreground py-20">
                <SearchX size={64} className="mb-4 text-primary/50"/>
                <h3 className="text-2xl font-bold text-foreground mb-2">Aucun produit trouvé</h3>
                <p>Essayez avec d'autres mots-clés ou explorez nos catégories.</p>
             </div>
          )}
        </div>
        
        {!searchTerm && totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-16">
                <Button onClick={() => handlePageChange(-1)} disabled={currentPage === 1}>
                    ← Précédent
                </Button>
                <span className="font-bold text-primary">
                    Page {currentPage} sur {totalPages}
                </span>
                <Button onClick={() => handlePageChange(1)} disabled={currentPage === totalPages}>
                    Suivant →
                </Button>
            </div>
        )}

      </div>
    </section>
  );
};

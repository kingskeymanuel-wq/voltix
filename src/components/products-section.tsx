
"use client";

import * as React from "react";
import { categories } from "@/data/products";
import { ProductCard } from "./product-card";
import { Button } from "./ui/button";
import type { Category, Product } from "@/lib/types";
import { SearchX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductsSectionProps {
  allProducts: Product[];
  addToCart: (product: Product) => void;
  searchTerm: string;
}

export const ProductsSection = ({ allProducts, addToCart, searchTerm }: ProductsSectionProps) => {
  const [activeFilter, setActiveFilter] = React.useState<Category>('all');
  const [visibleProducts, setVisibleProducts] = React.useState(9);
  const [wishlist, setWishlist] = React.useState<Set<string>>(new Set());
  const { toast } = useToast();

  React.useEffect(() => {
    // Initial load from localStorage
    const storedWishlist = localStorage.getItem('voltix-wishlist');
    if (storedWishlist) {
      setWishlist(new Set(JSON.parse(storedWishlist)));
    }

    // Listen for storage changes to update wishlist across tabs/components
    const handleStorageChange = () => {
        const updatedStoredWishlist = localStorage.getItem('voltix-wishlist');
        setWishlist(updatedStoredWishlist ? new Set(JSON.parse(updatedStoredWishlist)) : new Set());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleWishlist = React.useCallback((productId: string) => {
    setWishlist(prev => {
        const newWishlist = new Set(prev);
        if (newWishlist.has(productId)) {
            newWishlist.delete(productId);
            toast({ title: "Retiré des favoris", description: "Le produit a été retiré de votre liste de souhaits." });
        } else {
            newWishlist.add(productId);
            toast({ title: "Ajouté aux favoris!", description: "Le produit a été ajouté à votre liste de souhaits." });
        }
        localStorage.setItem('voltix-wishlist', JSON.stringify(Array.from(newWishlist)));
        return newWishlist;
    });
  }, [toast]);

  const filteredProducts = React.useMemo(() => {
    let products = allProducts;
    
    if (activeFilter !== 'all') {
      products = products.filter((p) => p.category === activeFilter);
    }
    
    if (searchTerm) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return products;
  }, [activeFilter, searchTerm, allProducts]);

  const productsToShow = React.useMemo(() => {
    return filteredProducts.slice(0, visibleProducts);
  }, [filteredProducts, visibleProducts]);

  const handleFilterChange = (category: Category) => {
    setActiveFilter(category);
    setVisibleProducts(9);
  };
  
  const loadMoreProducts = () => {
    setVisibleProducts(prev => prev + 9);
  };

  return (
    <section id="products" className="py-24 bg-gradient-to-b from-black to-gray-900/80">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-black font-headline text-center mb-4">Notre Catalogue</h2>
        <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Explorez le meilleur de la technologie. Chaque produit est sélectionné pour sa qualité et son innovation.
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
          {productsToShow.length > 0 ? (
            productsToShow.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                addToCart={addToCart} 
                index={index}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            ))
          ) : (
             <div className="col-span-full flex flex-col items-center justify-center text-center text-muted-foreground py-20">
                <SearchX size={64} className="mb-4 text-primary/50"/>
                <h3 className="text-2xl font-bold text-foreground mb-2">Aucun produit trouvé</h3>
                <p>Essayez de modifier vos filtres ou votre recherche.</p>
             </div>
          )}
        </div>

        {visibleProducts < filteredProducts.length && (
          <div className="mt-16 text-center">
            <Button onClick={loadMoreProducts} size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary">
              Afficher plus de produits
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/types";
import { Badge } from "./ui/badge";
import { getCategoryName } from "@/data/products";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
  index: number;
}

export const ProductCard = ({ product, addToCart, index }: ProductCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-card to-gray-900/60 border border-white/10 rounded-2xl overflow-hidden group transition-all duration-300 hover:border-primary hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
      <CardHeader className="p-0">
        <div className="relative h-64 w-full">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.dataAiHint}
          />
          {product.badge && (
            <Badge className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white border-none shadow-lg">
              {product.badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-sm font-bold uppercase text-primary mb-2 tracking-wider">{getCategoryName(product.category)}</p>
        <CardTitle className="text-xl font-extrabold mb-2 h-14">{product.name}</CardTitle>
        <p className="text-3xl font-black text-primary mb-4">{product.price.toLocaleString()} FCFA</p>
        <p className="text-muted-foreground text-sm h-20 overflow-hidden">{product.description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex gap-2">
        <Button onClick={() => addToCart(product)} className="w-full font-bold bg-gradient-to-r from-primary to-blue-600 text-primary-foreground hover:scale-105 transition-transform duration-300">
          <ShoppingCart className="mr-2 h-4 w-4"/>
          Ajouter au panier
        </Button>
        <Button variant="outline" size="icon" className="border-primary/30 text-primary hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 transition-colors">
          <Heart className="h-4 w-4"/>
        </Button>
      </CardFooter>
    </Card>
  );
};

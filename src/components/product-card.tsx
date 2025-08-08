
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { BookMarked } from "lucide-react";
import type { Product } from "@/lib/types";
import { Badge } from "./ui/badge";
import { getCategoryName } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <Card className="bg-gradient-to-br from-card to-gray-900/60 border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:border-primary group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-primary/20">
        <CardHeader className="p-0">
          <div className="relative h-64 w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.dataAiHint}
            />
            {product.badge && (
              <Badge className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white border-none shadow-lg">
                {product.badge}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-1">
          <p className="text-sm font-bold uppercase text-primary mb-2 tracking-wider">{getCategoryName(product.category)}</p>
          <CardTitle className="text-xl font-headline font-extrabold mb-2 h-14">{product.name}</CardTitle>
          <p className="text-muted-foreground text-sm h-20 overflow-hidden">{product.description}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex gap-2 mt-auto">
          <Button className="w-full font-bold bg-gradient-to-r from-primary to-yellow-600 text-primary-foreground hover:scale-105 transition-transform duration-300">
            <BookMarked className="mr-2 h-4 w-4"/>
            Commencer l'Aventure
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

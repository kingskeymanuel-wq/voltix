"use client"

import * as React from "react"
import { Button } from "./ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { Card, CardContent } from "./ui/card"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

const featuredProducts = [
  {
    title: "VOLTIX SMART",
    description: "L'excellence technologique à portée de main. Découvrez notre gamme premium d'électronique avec livraison express et paiement mobile sécurisé en Côte d'Ivoire.",
    image: "https://placehold.co/1920x1080",
    dataAiHint: "modern electronics",
    primaryCta: "Explorer nos produits",
    secondaryCta: "Service client 24/7",
  },
  {
    title: "iPhone 15 Pro Max",
    description: "Le smartphone le plus avancé d'Apple avec puce A17 Pro et un design en titane. Capturez des photos et vidéos incroyables.",
    image: "https://placehold.co/1920x1080",
    dataAiHint: "iphone pro",
    primaryCta: "Découvrir maintenant",
    secondaryCta: "Voir les accessoires",
  },
  {
    title: "MacBook Pro 16\" M3",
    description: "Puissance et performance redéfinies. L'ordinateur portable ultime pour les créatifs et les professionnels exigeants.",
    image: "https://placehold.co/1920x1080",
    dataAiHint: "macbook pro",
    primaryCta: "Comparer les modèles",
    secondaryCta: "Contacter un expert",
  },
];


export const Hero = () => {
    const handleScrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
    <section id="home" className="relative w-full h-[85vh] overflow-hidden">
        <Carousel
            className="w-full h-full"
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
            opts={{ loop: true }}
        >
            <CarouselContent className="h-full">
                {featuredProducts.map((product, index) => (
                    <CarouselItem key={index} className="h-full">
                        <div className="relative w-full h-full">
                            <Image
                                src={product.image}
                                alt={product.title}
                                layout="fill"
                                objectFit="cover"
                                className="brightness-50"
                                data-ai-hint={product.dataAiHint}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="container mx-auto px-4 text-center text-white z-10">
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 animate-glow bg-gradient-to-r from-white to-primary/80 bg-clip-text text-transparent drop-shadow-2xl">
                                        {product.title}
                                    </h1>
                                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/80 mb-8">
                                        {product.description}
                                    </p>
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                        <Button 
                                          size="lg" 
                                          onClick={() => handleScrollTo('products')}
                                          className="text-lg font-bold bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-full px-10 py-7 hover:scale-105 hover:shadow-[0_0_35px_rgba(0,212,255,0.6)] transition-all duration-300">
                                            {product.primaryCta}
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            size="lg" 
                                            onClick={() => handleScrollTo('contact')}
                                            className="text-lg font-bold border-2 border-primary text-primary bg-transparent rounded-full px-10 py-7 hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300">
                                            {product.secondaryCta}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        </Carousel>
    </section>
    );
};


"use client"

import * as React from "react"
import { Button } from "./ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

const featuredContent = [
  {
    type: "image",
    title: "VOLTIX SMART",
    description: "La technologie de demain, aujourd'hui. Explorez notre sélection premium de smartphones, laptops et gadgets high-tech.",
    mediaUrl: "https://images.unsplash.com/photo-1550009158-94ae76552485?q=80&w=2586&auto=format&fit=crop",
    dataAiHint: "modern electronics desk",
    primaryCta: "Explorer les Produits",
    secondaryCta: "Nos Services",
  },
  {
    type: "image",
    title: "iPhone 15 Pro Max",
    description: "Titane. Si robuste. Si léger. Si Pro. Le summum de la technologie Apple entre vos mains.",
    mediaUrl: "https://images.unsplash.com/photo-1695026901844-f1737f374e6a?q=80&w=2670&auto=format&fit=crop",
    dataAiHint: "iphone pro",
    primaryCta: "Acheter Maintenant",
    secondaryCta: "En savoir plus",
  },
  {
    type: "image",
    title: "MacBook Pro M3",
    description: "Une puissance monstre. Une autonomie qui change la donne. L'ordinateur portable pro par excellence.",
    mediaUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2526&auto=format&fit=crop",
    dataAiHint: "macbook pro",
    primaryCta: "Découvrir la gamme",
    secondaryCta: "Comparer les modèles",
  },
  {
    type: "image",
    title: "Livraison Express 24H",
    description: "Commandez aujourd'hui, recevez demain. Notre service de livraison ultra-rapide sur Abidjan.",
    mediaUrl: "https://images.unsplash.com/photo-1588961732739-e95843d4c794?q=80&w=2670&auto=format&fit=crop",
    dataAiHint: "delivery truck city",
    primaryCta: "Suivre ma commande",
    secondaryCta: "Zones de livraison",
  },
];


export const Hero = () => {
    const handleScrollToProducts = () => {
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
    <section id="home" className="relative w-full h-[85vh] overflow-hidden">
        <Carousel
            className="w-full h-full"
            plugins={[Autoplay({ delay: 7000, stopOnInteraction: true })]}
            opts={{ loop: true }}
        >
            <CarouselContent className="h-full">
                {featuredContent.map((content, index) => (
                    <CarouselItem key={index} className="h-full">
                        <div className="relative w-full h-full">
                            <Image
                                src={content.mediaUrl}
                                alt={content.title}
                                fill
                                objectFit="cover"
                                className="brightness-50"
                                data-ai-hint={content.dataAiHint}
                                priority={index === 0}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="container mx-auto px-4 text-center text-white z-10">
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-headline mb-6 animate-glow bg-gradient-to-r from-white to-primary/80 bg-clip-text text-transparent drop-shadow-2xl">
                                        {content.title}
                                    </h1>
                                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/80 mb-8 font-body">
                                        {content.description}
                                    </p>
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                        <Button 
                                          size="lg" 
                                          onClick={handleScrollToProducts}
                                          className="text-lg font-bold bg-gradient-to-r from-primary to-blue-600 text-white rounded-full px-10 py-7 hover:scale-105 hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] transition-all duration-300">
                                            {content.primaryCta}
                                        </Button>
                                        <Button size="lg" variant="outline" className="text-lg font-bold bg-transparent border-2 border-white text-white rounded-full px-10 py-7 hover:bg-white hover:text-black transition-colors duration-300">
                                            {content.secondaryCta}
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

    
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
    description: "L'excellence technologique à portée de main. Découvrez notre gamme premium d'électronique avec livraison express et paiement mobile sécurisé en Côte d'Ivoire.",
    mediaUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    dataAiHint: "modern electronics",
    primaryCta: "Explorer nos produits",
    secondaryCta: "Service client 24/7",
  },
  {
    type: "image",
    title: "iPhone 15 Pro Max",
    description: "Le smartphone le plus avancé d'Apple avec puce A17 Pro et un design en titane. Capturez des photos et vidéos incroyables.",
    mediaUrl: "https://images.unsplash.com/photo-1695026901844-f1737f374e6a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    dataAiHint: "iphone pro",
    primaryCta: "Découvrir maintenant",
    secondaryCta: "Voir les accessoires",
  },
  {
    type: "image",
    title: "MacBook Pro 16\" M3",
    description: "Puissance et performance redéfinies. L'ordinateur portable ultime pour les créatifs et les professionnels exigeants.",
    mediaUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2526&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
            plugins={[Autoplay({ delay: 7000, stopOnInteraction: true })]}
            opts={{ loop: true }}
        >
            <CarouselContent className="h-full">
                {featuredContent.map((content, index) => (
                    <CarouselItem key={index} className="h-full">
                        <div className="relative w-full h-full">
                            {content.type === 'image' ? (
                                <Image
                                    src={content.mediaUrl}
                                    alt={content.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="brightness-50"
                                    data-ai-hint={content.dataAiHint}
                                    priority={index === 0}
                                />
                            ) : (
                                <video
                                    src={content.mediaUrl}
                                    className="absolute top-0 left-0 w-full h-full object-cover brightness-50"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    data-ai-hint={content.dataAiHint}
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="container mx-auto px-4 text-center text-white z-10">
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 animate-glow bg-gradient-to-r from-white to-primary/80 bg-clip-text text-transparent drop-shadow-2xl">
                                        {content.title}
                                    </h1>
                                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/80 mb-8">
                                        {content.description}
                                    </p>
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                        <Button 
                                          size="lg" 
                                          onClick={() => handleScrollTo('products')}
                                          className="text-lg font-bold bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-full px-10 py-7 hover:scale-105 hover:shadow-[0_0_35px_rgba(0,212,255,0.6)] transition-all duration-300">
                                            {content.primaryCta}
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            size="lg" 
                                            onClick={() => {
                                                const contactModal = document.querySelector('[data-radix-dialog-trigger]');
                                                if (contactModal instanceof HTMLElement) {
                                                    contactModal.click();
                                                }
                                            }}
                                            className="text-lg font-bold border-2 border-primary text-primary bg-transparent rounded-full px-10 py-7 hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300">
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

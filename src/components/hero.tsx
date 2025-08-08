
"use client"

import * as React from "react"
import { Button } from "./ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

const featuredContent = [
  {
    type: "image",
    title: "BIBLE AVENTURE",
    description: "Plongez au cœur des récits sacrés. Explorez les vies des prophètes, revivez les grands miracles et comprenez les enseignements intemporels de la Bible.",
    mediaUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2670&auto=format&fit=crop",
    dataAiHint: "ancient scroll bible",
    primaryCta: "Commencer une Aventure",
  },
  {
    type: "image",
    title: "La Sagesse de Salomon",
    description: "Découvrez les proverbes et les décisions qui ont fait de Salomon le roi le plus sage de tous les temps. Une quête de discernement et de justice.",
    mediaUrl: "https://images.unsplash.com/photo-1610623379963-782f254f15e0?q=80&w=2670&auto=format&fit=crop",
    dataAiHint: "king throne gold",
    primaryCta: "Explorer la Sagesse",
  },
  {
    type: "image",
    title: "La Traversée de la Mer Rouge",
    description: "Soyez témoin de la puissance divine et guidez le peuple hébreu à travers les eaux partagées, fuyant l'armée du pharaon.",
    mediaUrl: "https://images.unsplash.com/photo-1590079019245-3ff1c833532f?q=80&w=2574&auto=format&fit=crop",
    dataAiHint: "ocean waves parting",
    primaryCta: "Revivre le Miracle",
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
                                          onClick={() => handleScrollTo('adventures')}
                                          className="text-lg font-bold bg-gradient-to-r from-primary to-yellow-600 text-primary-foreground rounded-full px-10 py-7 hover:scale-105 hover:shadow-[0_0_35px_rgba(217,163,65,0.6)] transition-all duration-300">
                                            {content.primaryCta}
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

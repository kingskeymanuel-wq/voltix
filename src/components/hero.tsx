
"use client"

import * as React from "react"
import { Button } from "./ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useRouter } from "next/navigation";
import type { Category } from "@/lib/types";

const featuredContent = [
  {
    type: "video",
    title: "VOLTIX SMART",
    description: "La technologie de demain, aujourd'hui. Explorez notre sélection premium de smartphones, laptops et gadgets high-tech.",
    mediaUrl: "https://videos.pexels.com/video-files/3254013/3254013-hd_1920_1080_25fps.mp4",
    primaryCta: { text: "Explorer les Produits", action: 'scroll', target: '#products' },
    secondaryCta: { text: "Nos accessoires", action: 'scrollAndFilter', target: '#products', filter: 'accessories' as Category },
  },
  {
    type: "video",
    title: "Performance & Puissance",
    description: "Des composants de pointe pour une expérience utilisateur sans compromis, que vous soyez gamer, créatif ou professionnel.",
    mediaUrl: "https://videos.pexels.com/video-files/7689143/7689143-hd_1920_1080_25fps.mp4",
    primaryCta: { text: "Voir les Laptops", action: 'scrollAndFilter', target: '#products', filter: 'laptops' as Category },
    secondaryCta: { text: "Comparer les modèles", action: 'scroll', target: '#products' },
  },
  {
    type: "video",
    title: "Son Immersif & Gaming",
    description: "Plongez au cœur de l'action avec notre sélection de casques et d'équipements gaming pour une expérience inégalée.",
    mediaUrl: "https://videos.pexels.com/video-files/7162529/7162529-hd_1920_1080_30fps.mp4",
    primaryCta: { text: "Équipez-vous pour la victoire", action: 'scrollAndFilter', target: '#products', filter: 'gaming' as Category },
    secondaryCta: { text: "Découvrir l'audio", action: 'scrollAndFilter', target: '#products', filter: 'audio' as Category },
  },
  {
    type: "video",
    title: "Capturez l'Instant",
    description: "Des appareils photos et drones équipés des dernières technologies pour des images à couper le souffle.",
    mediaUrl: "https://videos.pexels.com/video-files/4692372/4692372-hd_1920_1080_25fps.mp4",
    primaryCta: { text: "Découvrir les caméras", action: 'scrollAndFilter', target: '#products', filter: 'cameras' as Category },
    secondaryCta: { text: "Voir les drones", action: 'scrollAndFilter', target: '#products', filter: 'drones' as Category },
  },
  {
    type: "video",
    title: "Service Client Dédié",
    description: "Une question ? Un besoin ? Notre équipe est à votre écoute 24h/7j pour vous accompagner.",
    mediaUrl: "https://videos.pexels.com/video-files/7578553/7578553-hd_1920_1080_25fps.mp4",
    primaryCta: { text: "Nous Contacter", action: 'contact' },
    secondaryCta: { text: "Suivre ma commande", action: 'navigate', target: '/suivi-commande' },
  },
];

interface HeroProps {
  onContactClick: () => void;
  onFilterClick: (category: Category) => void;
}

export const Hero = ({ onContactClick, onFilterClick }: HeroProps) => {
    const router = useRouter();

    const handleAction = (action: 'scroll' | 'navigate' | 'contact' | 'scrollAndFilter', target?: string, filter?: Category) => {
        if ((action === 'scroll' || action === 'scrollAndFilter') && target) {
            if (action === 'scrollAndFilter' && filter) {
                onFilterClick(filter);
            }
            const element = document.querySelector(target);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (action === 'navigate' && target) {
            router.push(target);
        } else if (action === 'contact') {
            onContactClick();
        }
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
                           <video
                              src={content.mediaUrl}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover brightness-50"
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
                                          onClick={() => handleAction(content.primaryCta.action, content.primaryCta.target, (content.primaryCta as any).filter)}
                                          className="text-lg font-bold bg-gradient-to-r from-primary to-blue-600 text-white rounded-full px-10 py-7 hover:scale-105 hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] transition-all duration-300">
                                            {content.primaryCta.text}
                                        </Button>
                                        <Button 
                                            size="lg" 
                                            variant="outline" 
                                            onClick={() => handleAction(content.secondaryCta.action, content.secondaryCta.target, (content.secondaryCta as any).filter)}
                                            className="text-lg font-bold bg-transparent border-2 border-white text-white rounded-full px-10 py-7 hover:bg-white hover:text-black transition-colors duration-300">
                                            {content.secondaryCta.text}
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

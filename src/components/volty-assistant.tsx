"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { CornerDownLeft, Loader2, Sparkles, X, ShoppingCart } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { suggestProducts } from "@/ai/flows/product-suggester";
import type { ProductSuggesterOutput } from "@/ai/flows/product-suggester";
import type { Product } from "@/lib/types";

interface VoltyAssistantProps {
    addToCart: (product: Product) => void;
}

export function VoltyAssistant({ addToCart }: VoltyAssistantProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [conversation, setConversation] = React.useState<({type: 'user' | 'volty', content: string, products?: ProductSuggesterOutput['products']})[]>([]);

    const { toast } = useToast();

    const handleToggle = () => setIsOpen(prev => !prev);

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!query.trim() || isLoading) return;

        setIsLoading(true);
        const userMessage = { type: 'user' as const, content: query };
        setConversation(prev => [...prev, userMessage]);
        
        try {
            const result = await suggestProducts({ query });
            const voltyMessage = { 
                type: 'volty' as const, 
                content: result.thought,
                products: result.products
            };
            setConversation(prev => [...prev, voltyMessage]);
        } catch (error) {
            console.error("AI suggestion error:", error);
            const errorMessage = { type: 'volty' as const, content: "Désolé, je n'arrive pas à trouver de produits pour le moment. Veuillez réessayer."};
            setConversation(prev => [...prev, errorMessage]);
            toast({
                variant: "destructive",
                title: "Erreur de l'assistant",
                description: "Une erreur est survenue lors de la recherche de produits.",
            });
        } finally {
            setIsLoading(false);
            setQuery("");
        }
    };
    
    const handleAddProduct = (product: ProductSuggesterOutput['products'][0]) => {
        const fullProduct: Product = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            dataAiHint: product.dataAiHint,
            category: 'suggested' // This could be improved
        };
        addToCart(fullProduct);
    };

    return (
        <>
            <motion.div 
                className="fixed bottom-6 right-6 z-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
            >
                <Button 
                    onClick={handleToggle} 
                    className="rounded-full w-20 h-20 bg-gradient-to-br from-primary to-blue-600 shadow-2xl shadow-primary/40 hover:scale-110 transition-transform duration-300"
                >
                    <Image src="/volty-assistant.png" alt="Assistant VOLTY" width={70} height={70} />
                </Button>
            </motion.div>

            <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed bottom-28 right-6 z-50 w-[90vw] max-w-sm"
                >
                    <Card className="bg-background/80 backdrop-blur-xl border-primary/30 shadow-2xl shadow-primary/20 flex flex-col h-[60vh]">
                        <header className="flex items-center justify-between p-4 border-b border-primary/20">
                            <div className="flex items-center gap-2">
                                <Sparkles className="text-primary"/>
                                <h3 className="font-bold text-lg">Assistant VOLTY</h3>
                            </div>
                            <Button variant="ghost" size="icon" onClick={handleToggle}><X/></Button>
                        </header>
                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            <div className="p-3 rounded-lg bg-primary/10 text-sm">
                                <p className="font-bold">Salut ! Je suis VOLTY.</p>
                                <p>Décrivez-moi le produit que vous cherchez (ex: "un téléphone pour la photo" ou "un PC portable pour le gaming") et je vous aiderai.</p>
                            </div>
                            {conversation.map((msg, index) => (
                                <div key={index} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`p-3 rounded-lg max-w-xs ${msg.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                        {msg.products && (
                                            <div className="mt-3 space-y-2">
                                                {msg.products.map(p => (
                                                    <Card key={p.id} className="bg-background/50">
                                                        <CardContent className="p-2 flex gap-2 items-center">
                                                            <Image src={p.image} alt={p.name} width={50} height={50} className="rounded" data-ai-hint={p.dataAiHint} />
                                                            <div className="flex-1">
                                                                <p className="font-bold text-xs">{p.name}</p>
                                                                <p className="text-xs text-muted-foreground">{p.description}</p>
                                                                <p className="text-primary font-bold text-sm mt-1">{p.price.toLocaleString()} FCFA</p>
                                                            </div>
                                                            <Button size="icon" variant="ghost" onClick={() => handleAddProduct(p)} className="text-primary shrink-0"><ShoppingCart size={16}/></Button>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                 <div className="flex items-start">
                                     <div className="p-3 rounded-lg bg-secondary flex items-center gap-2">
                                        <Loader2 className="animate-spin h-5 w-5 text-primary"/>
                                        <span className="text-sm text-muted-foreground">VOLTY réfléchit...</span>
                                     </div>
                                 </div>
                            )}
                        </div>
                        <footer className="p-2 border-t border-primary/20">
                            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                                <Textarea
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit();
                                        }
                                    }}
                                    placeholder="Décrivez votre besoin..."
                                    className="flex-1 min-h-[40px] max-h-24 resize-none"
                                    disabled={isLoading}
                                />
                                <Button type="submit" size="icon" disabled={isLoading || !query.trim()}>
                                    <CornerDownLeft />
                                </Button>
                            </form>
                        </footer>
                    </Card>
                </motion.div>
            )}
            </AnimatePresence>
        </>
    );
}

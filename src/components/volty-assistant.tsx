
"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { CornerDownLeft, Loader2, Sparkles, X, BookOpen } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { suggestProducts } from "@/ai/flows/product-suggester";
import type { ProductSuggesterOutput } from "@/ai/flows/product-suggester";
import type { Product } from "@/lib/types";
import Link from "next/link";

interface VoltyAssistantProps {}

type ConversationMessage = {
    type: 'user' | 'guide';
    content: string;
    products?: ProductSuggesterOutput['products'];
    answer?: string;
};

export function VoltyAssistant({}: VoltyAssistantProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [conversation, setConversation] = React.useState<ConversationMessage[]>([]);

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
            const voltyMessage: ConversationMessage = { 
                type: 'guide' as const, 
                content: result.answer || (result.products ? "Voici quelques récits qui pourraient vous intéresser :" : "Comment puis-je vous guider aujourd'hui ?"),
                products: result.products,
                answer: result.answer
            };
            setConversation(prev => [...prev, voltyMessage]);
        } catch (error) {
            console.error("AI suggestion error:", error);
            const errorMessage = { type: 'guide' as const, content: "Désolé, une erreur s'est produite. Veuillez reformuler votre question ou réessayer plus tard."};
            setConversation(prev => [...prev, errorMessage]);
            toast({
                variant: "destructive",
                title: "Erreur du Guide",
                description: "Une erreur est survenue lors de la communication avec l'IA.",
            });
        } finally {
            setIsLoading(false);
            setQuery("");
        }
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
                    className="rounded-full w-20 h-20 bg-gradient-to-br from-primary to-yellow-600 shadow-2xl shadow-primary/40 hover:scale-110 transition-transform duration-300 flex flex-col items-center justify-center text-primary-foreground"
                >
                    <BookOpen size={32} />
                    <span className="text-xs font-bold">Guide</span>
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
                                <h3 className="font-bold font-headline text-lg">Votre Guide Spirituel</h3>
                            </div>
                            <Button variant="ghost" size="icon" onClick={handleToggle}><X/></Button>
                        </header>
                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            <div className="p-3 rounded-lg bg-primary/10 text-sm">
                                <p className="font-bold">Shalom !</p>
                                <p>Posez-moi une question sur une histoire, un personnage, ou un concept biblique. Je suis là pour vous éclairer.</p>
                            </div>
                            {conversation.map((msg, index) => (
                                <div key={index} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`p-3 rounded-lg max-w-xs ${msg.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                                        <p className="text-sm font-semibold text-muted-foreground">{msg.type === 'guide' ? "Guide" : "Vous"}</p>
                                        
                                        <p className="text-sm whitespace-pre-wrap">{msg.answer || msg.content}</p>

                                        {msg.products && (
                                            <div className="mt-3 space-y-2">
                                                {msg.products.map(p => (
                                                    <Card key={p.id} className="bg-background/50">
                                                      <Link href={`/product/${p.id}`} onClick={handleToggle}>
                                                        <CardContent className="p-2 flex gap-2 items-center">
                                                            <Image src={p.image} alt={p.name} width={50} height={50} className="rounded" data-ai-hint={p.dataAiHint} />
                                                            <div className="flex-1">
                                                                <p className="font-bold text-xs">{p.name}</p>
                                                                <p className="text-xs text-muted-foreground">{p.description}</p>
                                                            </div>
                                                        </CardContent>
                                                      </Link>
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
                                        <span className="text-sm text-muted-foreground">Le Guide médite...</span>
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
                                    placeholder="Ex: Qui était Moïse ?"
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

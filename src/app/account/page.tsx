
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { ContactBar } from "@/components/contact-bar";
import { ContactModal } from "@/components/contact-modal";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ShoppingBag, Heart, Settings, Bell, Lock, Globe, LogOut, Home, Truck, CreditCard, Save, FileSignature, BookOpen, Sparkles, CornerDownLeft, Bot, SearchX } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import type { Order, Ebook, EbookContent, Product } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { allEbooks } from "@/data/ebooks";
import { allEbookContents } from "@/data/ebook-content";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MtnLogo, OrangeLogo, WaveLogo, EagleIcon } from "@/components/icons";
import { QrCode, Smartphone } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { allProducts } from "@/data/products";
import { ProductCard } from "@/components/product-card";

type ConversationMessage = {
    type: 'user' | 'tutor';
    text: string;
};

const CardPaymentFormWrapper = ({ ebook, onPay, isProcessing }: { ebook: Ebook, onPay: (method: string) => void, isProcessing: boolean }) => {
  return (
    <TabsContent value="card">
      <Card className="bg-gray-800/50 border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard size={20}/>
            Paiement par Carte
          </CardTitle>
          <CardDescription>Payer {ebook.price.toLocaleString('fr-FR')} FCFA en toute sécurité.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-number-acc">Numéro de carte</Label>
            <Input id="card-number-acc" placeholder="0000 0000 0000 0000" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="card-expiry-acc">Expiration</Label>
              <Input id="card-expiry-acc" placeholder="MM/AA" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-cvc-acc">CVC</Label>
              <Input id="card-cvc-acc" placeholder="123" />
            </div>
          </div>
          <Button onClick={() => onPay('Carte Bancaire')} disabled={isProcessing} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            <Lock className="mr-2"/>
            {isProcessing ? "Vérification..." : `Payer ${ebook.price.toLocaleString('fr-FR')} FCFA`}
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
};


const EbookPaymentModal = ({ ebook, isOpen, onOpenChange, onPaymentSuccess }: { ebook: Ebook | null, isOpen: boolean, onOpenChange: (open: boolean) => void, onPaymentSuccess: (ebookId: string) => void }) => {
    const [isProcessing, setIsProcessing] = React.useState(false);
    const { toast } = useToast();
    if (!ebook) return null;

    const handleProcessPayment = (method: string) => {
        setIsProcessing(true);
        toast({ title: "Vérification du paiement...", description: `Paiement de ${ebook.title} en cours via ${method}.` });

        setTimeout(() => {
            setIsProcessing(false);
            onOpenChange(false);
            onPaymentSuccess(ebook.id);
            toast({
                title: "Paiement réussi !",
                description: `Vous avez maintenant accès à "${ebook.title}".`
            });
        }, 2000);
    };
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md bg-background/95 backdrop-blur-xl">
                 <DialogHeader>
                    <DialogTitle className="text-primary text-2xl flex items-center gap-3"><BookOpen /> Acheter l'E-book</DialogTitle>
                    <DialogDescription>
                        Finalisez l'achat de <span className="font-bold text-white">{ebook.title}</span> pour {ebook.price.toLocaleString('fr-FR')} FCFA.
                    </DialogDescription>
                </DialogHeader>
                 <Tabs defaultValue="card" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
                        <TabsTrigger value="card"><CreditCard /></TabsTrigger>
                        <TabsTrigger value="orange"><OrangeLogo /></TabsTrigger>
                        <TabsTrigger value="wave"><WaveLogo /></TabsTrigger>
                        <TabsTrigger value="mtn"><MtnLogo /></TabsTrigger>
                    </TabsList>
                    <CardPaymentFormWrapper onPay={handleProcessPayment} isProcessing={isProcessing} ebook={ebook} />
                    <MobilePaymentFormWrapper method="orange" onPay={handleProcessPayment} isProcessing={isProcessing} ebook={ebook} />
                    <MobilePaymentFormWrapper method="wave" onPay={handleProcessPayment} isProcessing={isProcessing} ebook={ebook} />
                    <MobilePaymentFormWrapper method="mtn" onPay={handleProcessPayment} isProcessing={isProcessing} ebook={ebook} />
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

const MobilePaymentFormWrapper = ({ method, onPay, isProcessing, ebook }: { method: 'orange' | 'wave' | 'mtn', onPay: (method: string) => void, isProcessing: boolean, ebook: Ebook }) => {
  const titles = {
    orange: 'Orange Money',
    wave: 'Wave',
    mtn: 'MTN Mobile Money'
  };
  
  return (
    <TabsContent value={method}>
      <Card className="bg-gray-800/50 border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone size={20}/>
            Paiement {titles[method]}
          </CardTitle>
          <CardDescription>Entrez votre numéro pour payer {ebook.price.toLocaleString('fr-FR')} FCFA.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${method}-phone`}>Numéro de téléphone</Label>
            <Input id={`${method}-phone`} type="tel" placeholder="0X XX XX XX XX" />
          </div>
          <Button onClick={() => onPay(method)} disabled={isProcessing} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            {isProcessing ? "Vérification..." : `Payer avec ${titles[method]}`}
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
};


const EbookContentModal = ({ ebook, content, isOpen, onOpenChange }: { ebook: Ebook | null, content: EbookContent | null, isOpen: boolean, onOpenChange: (open: boolean) => void }) => {
    const [query, setQuery] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [conversation, setConversation] = React.useState<ConversationMessage[]>([]);

    React.useEffect(() => {
        if (isOpen) {
            setConversation([]);
            setQuery("");
        }
    }, [isOpen]);

    if (!ebook || !content) return null;

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!query.trim() || isLoading) return;

        const newConversation = [...conversation, { type: 'user' as const, text: query }];
        setConversation(newConversation);
        setIsLoading(true);
        setQuery("");

        // Mock AI response
        setTimeout(() => {
            const aiResponse: ConversationMessage = {
                type: 'tutor',
                text: `Ceci est une réponse simulée concernant "${query}" pour l'e-book "${ebook.title}". Dans une version réelle, une IA spécialisée répondrait en se basant sur le contenu de l'e-book.`
            };
            setConversation([...newConversation, aiResponse]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[90vh] bg-background/95 backdrop-blur-xl flex flex-col p-0">
                <DialogHeader className="p-4 border-b">
                    <DialogTitle className="text-primary text-2xl flex items-center gap-3"><BookOpen /> {ebook.title}</DialogTitle>
                    <DialogDescription>{ebook.description}</DialogDescription>
                </DialogHeader>

                <div className="flex-1 grid md:grid-cols-2 gap-2 p-4 min-h-0">
                    {/* E-book Content */}
                    <div className="flex flex-col gap-4 min-h-0">
                        <h3 className="font-bold text-lg">Plan du Livre</h3>
                        <ScrollArea className="flex-1 pr-4">
                             <Accordion type="multiple" defaultValue={[content.chapters[0]?.title || '']} className="w-full">
                                {content.chapters.map((chapter, index) => (
                                    <AccordionItem key={index} value={chapter.title}>
                                        <AccordionTrigger>{index + 1}. {chapter.title}</AccordionTrigger>
                                        <AccordionContent className="pl-4 space-y-2">
                                            <Accordion type="multiple" className="w-full">
                                                {chapter.sections.map((section, pIndex) => (
                                                    <AccordionItem key={pIndex} value={section.title}>
                                                        <AccordionTrigger className="text-sm hover:no-underline">{section.title}</AccordionTrigger>
                                                        <AccordionContent className="pl-4 text-muted-foreground whitespace-pre-wrap text-sm">
                                                            {section.content}
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                ))}
                                            </Accordion>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </ScrollArea>
                    </div>

                    {/* AI Tutor */}
                    <div className="flex flex-col border rounded-lg overflow-hidden">
                        <header className="flex items-center gap-2 p-3 bg-primary/10">
                            <Sparkles className="text-primary" />
                            <h3 className="font-bold">Tuteur IA Personnalisé</h3>
                        </header>
                        <ScrollArea className="flex-1 p-4 bg-background/50">
                            <div className="space-y-4">
                               <div className="flex items-start">
                                     <div className="p-3 rounded-lg bg-secondary flex items-center gap-2">
                                        <EagleIcon className="h-5 w-5 text-primary flex-shrink-0"/>
                                        <span className="text-sm text-muted-foreground">Bonjour ! Posez-moi une question sur le contenu de cet e-book.</span>
                                     </div>
                                 </div>
                                {conversation.map((msg, index) => (
                                    <div key={index} className={`flex items-start gap-2.5 ${msg.type === 'user' ? 'justify-end' : ''}`}>
                                         {msg.type === 'tutor' && <EagleIcon className="h-5 w-5 text-primary flex-shrink-0 mt-1"/>}
                                         <div className={`p-3 rounded-lg max-w-sm ${msg.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                                            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                         </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <footer className="p-2 border-t">
                             <form onSubmit={handleSubmit} className="flex items-center gap-2">
                                <Input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Posez votre question ici..."
                                    className="flex-1"
                                    disabled={isLoading}
                                />
                                <Button type="submit" size="icon" disabled={isLoading || !query.trim()}>
                                    <CornerDownLeft />
                                </Button>
                            </form>
                        </footer>
                    </div>
                </div>

                <DialogFooter className="p-4 border-t">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Fermer</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

type ClientView = 'details' | 'orders' | 'wishlist' | 'settings' | 'contracts' | 'ebooks';

const mockContracts: Order[] = [
    { id: 'VOLTIX-17212497', date: '2024-07-17T20:56:12.981Z', total: 850000, status: 'validated', signature: 'Client VOLTIX', items: [{ id: 'p1', name: 'iPhone 15 Pro Max', category: 'smartphones', price: 850000, image: 'https://images.unsplash.com/photo-1695026901844-f1737f374e6a?q=80&w=2670&auto=format&fit=crop', dataAiHint: "iphone pro", description: 'Le smartphone le plus avancé d\'Apple...', quantity: 1}] },
    { id: 'VOLTIX-17212423', date: '2024-07-15T18:32:10.111Z', total: 1380000, status: 'delivered', signature: 'Client VOLTIX', items: [{ id: 'p7', name: 'MacBook Pro 16" M3', category: 'laptops', price: 1200000, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2526&auto=format&fit=crop', dataAiHint: "macbook pro", description: 'Ordinateur portable professionnel...', quantity: 1}, { id: 'p13', name: 'AirPods Pro 2', category: 'audio', price: 180000, image: 'https://images.unsplash.com/photo-1694650523737-233454792039?q=80&w=2670&auto=format&fit=crop', dataAiHint: "airpods pro", description: 'Écouteurs sans fil...', quantity: 1}] },
];

const AccountEbooks = () => {
    const { toast } = useToast();
    const [purchasedEbooks, setPurchasedEbooks] = React.useState<Set<string>>(new Set());
    const [selectedEbook, setSelectedEbook] = React.useState<Ebook | null>(null);
    const [isEbookPaymentModalOpen, setIsEbookPaymentModalOpen] = React.useState(false);
    const [currentEbookContent, setCurrentEbookContent] = React.useState<{ ebook: Ebook, content: EbookContent } | null>(null);
    const [isEbookContentModalOpen, setIsEbookContentModalOpen] = React.useState(false);
    
    React.useEffect(() => {
        const storedPurchases = localStorage.getItem('voltix-ebook-purchases');
        if (storedPurchases) {
            setPurchasedEbooks(new Set(JSON.parse(storedPurchases)));
        }
    }, []);

    const handlePurchaseClick = (ebook: Ebook) => {
        if (purchasedEbooks.has(ebook.id) || ebook.price === 0) {
            handleOpenEbook(ebook.id);
        } else {
            setSelectedEbook(ebook);
            setIsEbookPaymentModalOpen(true);
        }
    };

    const handlePaymentSuccess = (ebookId: string) => {
        const newPurchases = new Set(purchasedEbooks).add(ebookId);
        setPurchasedEbooks(newPurchases);
        localStorage.setItem('voltix-ebook-purchases', JSON.stringify(Array.from(newPurchases)));
        handleOpenEbook(ebookId);
    };

    const handleOpenEbook = (ebookId: string) => {
        const ebook = allEbooks.find(e => e.id === ebookId);
        const content = allEbookContents.find(c => c.id === ebookId);
        if (ebook && content) {
            setCurrentEbookContent({ ebook, content });
            setIsEbookContentModalOpen(true);
        } else {
            toast({ variant: "destructive", title: "Erreur", description: "Contenu de l'e-book introuvable." });
        }
    };

    return (
        <>
            <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><BookOpen /> Formations & E-books</CardTitle>
                    <CardDescription>Développez vos compétences avec nos guides stratégiques exclusifs.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    {allEbooks.map((ebook) => (
                         <Card key={ebook.id} className="bg-background/50 flex flex-col">
                            <CardHeader>
                                <CardTitle className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-primary/20 text-primary">
                                        <BookOpen size={24}/>
                                    </div>
                                    <div>
                                        {ebook.title}
                                        <p className="text-lg font-bold text-primary mt-1">
                                            {ebook.price > 0 ? `${ebook.price.toLocaleString('fr-FR')} FCFA` : 'Gratuit'}
                                        </p>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-muted-foreground">{ebook.description}</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={() => handlePurchaseClick(ebook)}>
                                    {purchasedEbooks.has(ebook.id) || ebook.price === 0 ? "Ouvrir l'E-book" : "Acheter cet E-book"}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </CardContent>
            </Card>
             <EbookPaymentModal ebook={selectedEbook} isOpen={isEbookPaymentModalOpen} onOpenChange={setIsEbookPaymentModalOpen} onPaymentSuccess={handlePaymentSuccess} />
             <EbookContentModal ebook={currentEbookContent?.ebook ?? null} content={currentEbookContent?.content ?? null} isOpen={isEbookContentModalOpen} onOpenChange={setIsEbookContentModalOpen} />
        </>
    );
};

const AccountDetails = () => {
    const { toast } = useToast();
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("client@voltix.ci");
    const [phone, setPhone] = React.useState("+225 01 02 03 04");
    const [isSameAddress, setIsSameAddress] = React.useState(true);
    const [photo, setPhoto] = React.useState<string | null>(null);

    React.useEffect(() => {
        const storedFirstName = localStorage.getItem('userFirstName') || "";
        const storedLastName = localStorage.getItem('userLastName') || "";
        const storedPhoto = localStorage.getItem('userPhoto');

        setFirstName(storedFirstName);
        setLastName(storedLastName);
        if (storedPhoto) setPhoto(storedPhoto);
    }, []);

    const handleSaveChanges = () => {
        localStorage.setItem('userFirstName', firstName);
        localStorage.setItem('userLastName', lastName);
        // Simulate a global state update for the header
        window.dispatchEvent(new Event('storage'));
        
        toast({
            title: "Modifications enregistrées !",
            description: "Vos informations ont été mises à jour avec succès.",
        });
    };

    return (
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3"><User /> Détails du Compte</CardTitle>
          <CardDescription>Gérez vos informations personnelles, adresses et moyens de paiement.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Informations Personnelles</h3>
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                      <AvatarImage src={photo || undefined} alt="Photo de profil" />
                      <AvatarFallback>
                          <User className="h-12 w-12 text-muted-foreground"/>
                      </AvatarFallback>
                  </Avatar>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                      <div className="space-y-2">
                          <Label htmlFor="firstname">Prénom</Label>
                          <Input id="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="lastname">Nom</Label>
                          <Input id="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="email">Adresse Email</Label>
                          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>
                  </div>
                </div>
            </div>
            <Separator/>
             <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary flex items-center gap-2"><Home/> Adresses</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3 p-4 bg-background/50 rounded-lg">
                        <h4 className="font-bold flex items-center gap-2"><Truck/> Adresse de Livraison</h4>
                        <Input placeholder="Adresse ligne 1" defaultValue="123 Rue de la Technologie"/>
                        <Input placeholder="Adresse ligne 2 (Optionnel)" defaultValue="Koumassi, Zone Industrielle"/>
                        <Input placeholder="Ville" defaultValue="Abidjan"/>
                        <Input placeholder="Code Postal" defaultValue="00225"/>
                    </div>
                    <div className="space-y-3 p-4 bg-background/50 rounded-lg">
                        <h4 className="font-bold flex items-center gap-2"><CreditCard/> Adresse de Facturation</h4>
                        <div className="flex items-center gap-2">
                            <Switch id="same-address" checked={isSameAddress} onCheckedChange={setIsSameAddress}/>
                            <Label htmlFor="same-address">Identique à l'adresse de livraison</Label>
                        </div>
                        {!isSameAddress && (
                             <div className="space-y-3 pt-2">
                                <Input placeholder="Adresse ligne 1"/>
                                <Input placeholder="Adresse ligne 2 (Optionnel)"/>
                                <Input placeholder="Ville"/>
                                <Input placeholder="Code Postal"/>
                            </div>
                        )}
                    </div>
                 </div>
            </div>
            <Separator/>
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Informations de Paiement</h3>
                <p className="text-sm text-muted-foreground">Vos informations de paiement sont sécurisées et ne sont jamais stockées sur nos serveurs.</p>
                 <div className="p-4 bg-background/50 rounded-lg">
                    <p>Aucun moyen de paiement enregistré.</p>
                </div>
            </div>

            <Button className="w-full font-bold text-lg p-6" onClick={handleSaveChanges}>
                <Save className="mr-3"/>
                Enregistrer les modifications
            </Button>
        </CardContent>
      </Card>
    );
};

const AccountContracts = () => (
    <Card className="bg-card/50 border-primary/20">
        <CardHeader>
            <CardTitle className="flex items-center gap-3"><FileSignature /> Mes Contrats</CardTitle>
            <CardDescription>Consultez l'historique de vos contrats de vente signés.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {mockContracts.map(contract => (
                 <Accordion type="single" collapsible key={contract.id}>
                    <AccordionItem value={contract.id}>
                        <AccordionTrigger className="text-lg font-semibold hover:no-underline p-4 bg-background/50 rounded-lg">
                            <div className="flex-1 text-left">
                                <p>Contrat #{contract.id}</p>
                                <p className="text-sm font-normal text-muted-foreground">
                                    Signé le {new Date(contract.date).toLocaleDateString('fr-FR')} - Total: {contract.total.toLocaleString('fr-FR')} FCFA
                                </p>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-4 px-4">
                            <h4 className="font-bold">Détails de la commande :</h4>
                             <ul className="list-disc list-inside text-muted-foreground">
                                {contract.items.map(item => (
                                    <li key={item.id}>{item.name} x {item.quantity}</li>
                                ))}
                            </ul>
                            <p><strong>Signature enregistrée :</strong> {contract.signature}</p>
                            <p><strong>Statut :</strong> <span className="font-bold text-accent">{contract.status}</span></p>
                            <Button variant="link" className="p-0 h-auto">Télécharger le PDF</Button>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))}
            {mockContracts.length === 0 && (
                 <div className="h-48 flex flex-col items-center justify-center text-muted-foreground">
                    <FileSignature size={48} className="mb-4"/>
                    <p>Vous n'avez aucun contrat pour le moment.</p>
                </div>
            )}
        </CardContent>
    </Card>
);


const AccountSettings = () => (
    <Card className="bg-card/50 border-primary/20">
        <CardHeader>
            <CardTitle className="flex items-center gap-3"><Settings /> Paramètres du Compte</CardTitle>
            <CardDescription>Personnalisez votre expérience VOLTIX.</CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full" defaultValue="notifications">
                <AccordionItem value="notifications">
                <AccordionTrigger className="text-lg font-semibold"><Bell className="mr-3" /> Notifications</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <Label htmlFor="email-notifications">Promotions et nouveautés par email</Label>
                    <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <Label htmlFor="sms-notifications">Alertes de commande par SMS</Label>
                    <Switch id="sms-notifications" />
                    </div>
                </AccordionContent>
                </AccordionItem>
                <AccordionItem value="security">
                <AccordionTrigger className="text-lg font-semibold"><Lock className="mr-3" /> Sécurité</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                    <div className="p-4 rounded-lg bg-background/50 space-y-3">
                        <Label htmlFor="current-password">Mot de passe actuel</Label>
                        <Input id="current-password" type="password" placeholder="••••••••" />
                        <Label htmlFor="new-password">Nouveau mot de passe</Label>
                        <Input id="new-password" type="password" placeholder="••••••••" />
                        <Button className="w-full">Changer le mot de passe</Button>
                    </div>
                </AccordionContent>
                </AccordionItem>
                <AccordionItem value="language">
                <AccordionTrigger className="text-lg font-semibold"><Globe className="mr-3" /> Langue et Région</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                    <div className="p-4 rounded-lg bg-background/50 space-y-3">
                    <Label>Langue</Label>
                     <Select defaultValue="fr">
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une langue" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="fr">
                                <span className="flex items-center gap-2">
                                    <Image src="https://flag.pk/flags/4x3/fr.svg" alt="Français" width={20} height={15} />
                                    Français
                                </span>
                            </SelectItem>
                            <SelectItem value="en">
                               <span className="flex items-center gap-2">
                                    <Image src="https://flag.pk/flags/4x3/gb.svg" alt="English" width={20} height={15} />
                                    English
                                </span>
                            </SelectItem>
                            <SelectItem value="es">
                                <span className="flex items-center gap-2">
                                    <Image src="https://flag.pk/flags/4x3/es.svg" alt="Español" width={20} height={15} />
                                    Español
                                </span>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

const AccountWishlist = () => {
    const [wishlist, setWishlist] = React.useState<Set<string>>(new Set());
    const { toast } = useToast();

    React.useEffect(() => {
        const storedWishlist = localStorage.getItem('voltix-wishlist');
        if (storedWishlist) {
            setWishlist(new Set(JSON.parse(storedWishlist)));
        }
        
        const handleStorageChange = () => {
            const updatedStoredWishlist = localStorage.getItem('voltix-wishlist');
            setWishlist(updatedStoredWishlist ? new Set(JSON.parse(updatedStoredWishlist)) : new Set());
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);

    }, []);

    const toggleWishlist = (productId: string) => {
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
            // Manually dispatch storage event to sync other components like product card
            window.dispatchEvent(new Event('storage'));
            return newWishlist;
        });
    };

    const wishlistedProducts = React.useMemo(() => {
        return allProducts.filter(p => wishlist.has(p.id));
    }, [wishlist]);
    
     // A dummy addToCart function since it's not the primary action here
    const addToCart = (product: Product) => {
       toast({
         title: `${product.name} ajouté !`,
         description: "Votre panier a été mis à jour (simulation).",
       });
    };

    return (
        <Card className="bg-card/50 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Heart /> Ma Liste de Souhaits</CardTitle>
                <CardDescription>Vos produits favoris, sauvegardés pour plus tard.</CardDescription>
            </CardHeader>
            <CardContent>
                {wishlistedProducts.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        {wishlistedProducts.map((product, index) => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                addToCart={addToCart} 
                                index={index}
                                wishlist={wishlist}
                                toggleWishlist={toggleWishlist}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
                        <Heart size={48} className="mb-4"/>
                        <p className="text-lg mb-2">Votre liste de souhaits est vide.</p>
                        <p>Cliquez sur le cœur sur un produit pour l'ajouter ici.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};


const PlaceholderContent = ({ title, icon: Icon }: { title: string; icon: React.ElementType }) => (
    <Card className="bg-card/50 border-primary/20">
        <CardHeader>
             <CardTitle className="flex items-center gap-3"><Icon /> {title}</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex flex-col items-center justify-center text-muted-foreground">
            <Icon size={48} className="mb-4"/>
            <p>La section "{title}" est en cours de construction.</p>
        </CardContent>
    </Card>
);


export default function AccountPage() {
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [activeView, setActiveView] = React.useState<ClientView>('details');
  const [userName, setUserName] = React.useState("");
  const [userPhoto, setUserPhoto] = React.useState<string | null>(null);
  const [isClient, setIsClient] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const storedFirstName = localStorage.getItem('userFirstName');
    const storedLastName = localStorage.getItem('userLastName');
    const storedPhoto = localStorage.getItem('userPhoto');
    if (storedFirstName && storedLastName) {
      setUserName(`${storedFirstName} ${storedLastName}`);
      setUserPhoto(storedPhoto);
      setIsClient(true);
    } else {
        router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
      localStorage.removeItem('userFirstName');
      localStorage.removeItem('userLastName');
      localStorage.removeItem('userPhoto');
      window.dispatchEvent(new Event('storage')); // Trigger update in header
      router.push('/login');
  }

  const renderContent = () => {
    switch (activeView) {
        case 'details':
            return <AccountDetails />;
        case 'settings':
            return <AccountSettings />;
        case 'contracts':
            return <AccountContracts />;
        case 'ebooks':
            return <AccountEbooks />;
        case 'wishlist':
            return <AccountWishlist />;
        case 'orders':
            return <PlaceholderContent title="Mes Commandes" icon={ShoppingBag} />;
        default:
            return <AccountDetails />;
    }
  }

  const NavButton = ({ view, label, icon: Icon }: { view: ClientView, label: string, icon: React.ElementType }) => (
      <Button 
        variant={activeView === view ? "default" : "outline"}
        onClick={() => setActiveView(view)}
        className="justify-start p-6 text-lg border-primary/30 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/10 hover:text-primary">
          <Icon className="mr-4" />
          {label}
      </Button>
  );
  
  if (!isClient) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-black to-gray-900/80">
      <Header
        cartCount={0}
        onCartClick={() => {}}
        onContactClick={() => setIsContactModalOpen(true)}
        searchTerm=""
        setSearchTerm={() => {}}
      />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-primary">Espace Client</h1>
          <p className="text-lg text-muted-foreground mt-2">Gérez vos informations et commandes.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-1 space-y-6">
             <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={userPhoto || undefined} />
                        <AvatarFallback>
                            <User/>
                        </AvatarFallback>
                    </Avatar>
                    Bonjour, {userName.split(' ')[0]}
                    </CardTitle>
                    <CardDescription>Bienvenue dans votre espace.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <NavButton view="details" label="Détails du Compte" icon={User}/>
                    <NavButton view="orders" label="Mes Commandes" icon={ShoppingBag}/>
                    <NavButton view="contracts" label="Mes Contrats" icon={FileSignature}/>
                    <NavButton view="ebooks" label="Mes Formations" icon={BookOpen}/>
                    <NavButton view="wishlist" label="Liste de Souhaits" icon={Heart}/>
                    <NavButton view="settings" label="Paramètres" icon={Settings}/>

                    <Button variant="destructive" className="justify-start p-6 text-lg mt-4" onClick={handleLogout}>
                        <LogOut className="mr-4" />
                        Déconnexion
                    </Button>
                </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {renderContent()}
          </div>
        </div>
      </main>
      <ContactBar onContactClick={() => setIsContactModalOpen(true)} />
      <ContactModal isOpen={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </div>
  );
}

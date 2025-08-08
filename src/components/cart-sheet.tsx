
"use client";

import * as React from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import type { CartItem, Product, Order } from "@/lib/types";
import { Minus, Plus, ShoppingCart, Trash2, X, CheckCircle, Smartphone, FileSignature, QrCode } from "lucide-react";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { MtnLogo, OrangeLogo, WaveLogo } from "./icons";
import { useToast } from "@/hooks/use-toast";
import { AccessoryRecommender } from "./accessory-recommender";
import { Checkbox } from "./ui/checkbox";

interface CartSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  cartItems: CartItem[];
  cartTotal: number;
  updateCartQuantity: (name: string, quantity: number) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void;
  addToCart: (product: Product) => void;
}

type PaymentStep = 'cart' | 'payment' | 'contract' | 'success';

export const CartSheet = ({
  isOpen,
  onOpenChange,
  cartItems,
  cartTotal,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  addToCart
}: CartSheetProps) => {
  const [step, setStep] = React.useState<PaymentStep>('cart');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [order, setOrder] = React.useState<Order | null>(null);
  const [signature, setSignature] = React.useState("");
  const [contractApproved, setContractApproved] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    if (isOpen) {
      setStep('cart');
      setIsProcessing(false);
      setOrder(null);
      setSignature("");
      setContractApproved(false);
    }
  }, [isOpen]);

  const handleGoToPayment = () => {
    const newOrder: Order = {
        id: 'VOLTIX-' + Date.now().toString().slice(-8),
        date: new Date().toISOString(),
        items: cartItems,
        total: cartTotal,
        status: 'pending',
        signature: '',
    };
    setOrder(newOrder);
    setStep('payment');
  }

  const handleProcessPayment = (method: string) => {
    setIsProcessing(true);
    toast({ title: "Vérification du paiement...", description: "Veuillez patienter." });

    setTimeout(() => {
      setIsProcessing(false);
      setStep('contract');
    }, 2000);
  };

  const handleConfirmOrder = () => {
    if (!order) return;
    setIsProcessing(true);
    toast({ title: "Finalisation de la commande...", description: "Veuillez patienter." });

    setTimeout(() => {
        const confirmedOrder = { ...order, status: 'validated' as const, signature };
        // In a real app, you would save this order to a database
        // and associate it with the logged-in user.
        // For now, we just update the state.
        setOrder(confirmedOrder); 
        setIsProcessing(false);
        setStep('success');
        clearCart();
    }, 2000);
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col bg-background/95 backdrop-blur-xl border-l-primary/20">
        <SheetHeader className="p-6">
          <SheetTitle className="text-2xl font-black text-primary flex items-center gap-2">
            <ShoppingCart /> Votre Panier VOLTIX
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 min-h-0">
          {step === 'cart' && (
            <ScrollArea className="h-full pr-6">
              {cartItems.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-lg object-cover" data-ai-hint={item.dataAiHint}/>
                      <div className="flex-1">
                        <h4 className="font-bold">{item.name}</h4>
                        <p className="text-primary font-semibold">{item.price.toLocaleString()} FCFA</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateCartQuantity(item.name, item.quantity - 1)}><Minus size={14}/></Button>
                          <span className="font-bold w-5 text-center">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateCartQuantity(item.name, item.quantity + 1)}><Plus size={14}/></Button>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500" onClick={() => removeFromCart(item.name)}>
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  ))}
                  <Separator className="my-4" />
                  <AccessoryRecommender cartItems={cartItems} addToCart={addToCart} />
                </div>
              ) : (
                <div className="text-center h-full flex flex-col justify-center items-center">
                  <ShoppingCart size={48} className="text-muted-foreground mb-4" />
                  <h3 className="text-xl font-bold mb-2">Votre panier est vide</h3>
                  <p className="text-muted-foreground">Découvrez nos produits premium.</p>
                </div>
              )}
            </ScrollArea>
          )}

          {step === 'payment' && order && (
            <div className="p-1">
              <h3 className="text-xl font-bold mb-4 text-center">💳 Paiement Mobile Sécurisé</h3>
              <Tabs defaultValue="orange" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
                  <TabsTrigger value="orange"><OrangeLogo /></TabsTrigger>
                  <TabsTrigger value="wave"><WaveLogo /></TabsTrigger>
                  <TabsTrigger value="mtn"><MtnLogo /></TabsTrigger>
                  <TabsTrigger value="qrcode"><QrCode className="h-6 w-6"/></TabsTrigger>
                </TabsList>
                <div className="mt-4">
                  <PaymentFormWrapper method="orange" onPay={handleProcessPayment} isProcessing={isProcessing} />
                  <PaymentFormWrapper method="wave" onPay={handleProcessPayment} isProcessing={isProcessing} />
                  <PaymentFormWrapper method="mtn" onPay={handleProcessPayment} isProcessing={isProcessing} />
                   <TabsContent value="qrcode">
                    <Card className="bg-gray-800/50 border-white/20">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <QrCode size={20}/>
                          Paiement par QR Code
                        </CardTitle>
                        <CardDescription>Scannez ce code avec votre application de paiement.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 flex flex-col items-center">
                         <Image 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=voltix:pay?orderId=${order.id}&amount=${order.total}`}
                            alt="QR Code de paiement"
                            width={200}
                            height={200}
                            className="rounded-lg bg-white p-2"
                         />
                        <Button onClick={() => handleProcessPayment('QR Code')} disabled={isProcessing} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                          {isProcessing ? "Vérification..." : "J'ai scanné, continuer"}
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </Tabs>
              <Button variant="link" onClick={() => setStep('cart')} className="w-full mt-4 text-primary">Retour au panier</Button>
            </div>
          )}

           {step === 'contract' && order && (
                <div className="p-1 flex flex-col h-full">
                    <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2"><FileSignature/> Contrat de Vente</h3>
                    <ScrollArea className="flex-1 pr-4">
                        <Card className="bg-secondary/50">
                            <CardHeader>
                                <CardTitle>Commande #{order.id}</CardTitle>
                                <CardDescription>Veuillez vérifier votre commande et approuver les termes.</CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm space-y-4">
                                <div>
                                    <h4 className="font-bold mb-2">Articles :</h4>
                                    {order.items.map(item => (
                                        <div key={item.id} className="flex justify-between">
                                            <span>{item.name} x {item.quantity}</span>
                                            <span>{(item.price * item.quantity).toLocaleString()} FCFA</span>
                                        </div>
                                    ))}
                                    <Separator className="my-2"/>
                                    <div className="flex justify-between font-bold text-base">
                                        <span>Total</span>
                                        <span className="text-primary">{order.total.toLocaleString()} FCFA</span>
                                    </div>
                                </div>
                                <Separator/>
                                <div>
                                    <h4 className="font-bold mb-2">Termes et Conditions</h4>
                                    <p className="text-xs text-muted-foreground">
                                        Le client reconnaît avoir reçu les informations complètes sur les caractéristiques essentielles des produits commandés. La garantie constructeur s'applique à tous les produits. VOLTIX SMART s'engage à une livraison sous 48h à Abidjan. En cas de litige, une solution à l'amiable sera recherchée. Ce contrat est régi par le droit ivoirien.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signature" className="font-bold">Signature (tapez votre nom complet)</Label>
                                    <Input id="signature" placeholder="Ex: Ali Koné" value={signature} onChange={(e) => setSignature(e.target.value)} />
                                </div>
                                <div className="flex items-center space-x-2 pt-2">
                                    <Checkbox id="terms" checked={contractApproved} onCheckedChange={(checked) => setContractApproved(checked as boolean)} />
                                    <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Lu et approuvé
                                    </label>
                                </div>
                            </CardContent>
                        </Card>
                    </ScrollArea>
                     <div className="flex gap-2 mt-4">
                        <Button variant="outline" onClick={() => setStep('payment')} className="w-full">Retour</Button>
                        <Button 
                            onClick={handleConfirmOrder} 
                            disabled={!signature || !contractApproved || isProcessing}
                            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                        >
                            {isProcessing ? "Finalisation..." : "Confirmer et Signer"}
                        </Button>
                    </div>
                </div>
            )}

          {step === 'success' && order && (
             <div className="flex flex-col items-center justify-center text-center p-6 h-full">
                <CheckCircle size={64} className="text-accent mb-4"/>
                <h3 className="text-2xl font-bold text-accent mb-2">Commande confirmée !</h3>
                <p className="text-muted-foreground mb-4">Votre contrat a été validé. Votre commande sera traitée rapidement.</p>
                <Card className="bg-gray-800/50 w-full">
                  <CardHeader>
                    <CardTitle>Référence de commande</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-code text-accent font-bold text-lg">{order.id}</p>
                  </CardContent>
                </Card>
                <SheetClose asChild>
                  <Button className="mt-6 w-full">Fermer</Button>
                </SheetClose>
             </div>
          )}
        </div>
        
        {step === 'cart' && cartItems.length > 0 && (
          <SheetFooter className="p-6 bg-background/80 border-t border-white/10 mt-auto">
            <div className="w-full space-y-4">
                <div className="flex justify-between items-center text-2xl font-black">
                    <span>Total:</span>
                    <span className="text-primary">{cartTotal.toLocaleString()} FCFA</span>
                </div>
                <Button onClick={handleGoToPayment} size="lg" className="w-full font-bold bg-accent text-accent-foreground hover:bg-accent/90">
                    Procéder au paiement
                </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

const PaymentFormWrapper = ({ method, onPay, isProcessing }: { method: 'orange' | 'wave' | 'mtn', onPay: (method: string) => void, isProcessing: boolean }) => {
  const titles = {
    orange: 'Paiement Orange Money',
    wave: 'Paiement Wave',
    mtn: 'Paiement MTN Mobile Money'
  };
  
  return (
    <TabsContent value={method}>
      <Card className="bg-gray-800/50 border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone size={20}/>
            {titles[method]}
          </CardTitle>
          <CardDescription>Entrez vos informations de paiement.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${method}-phone`}>Numéro de téléphone</Label>
            <Input id={`${method}-phone`} type="tel" placeholder="0X XX XX XX XX" />
          </div>
          <Button onClick={() => onPay(method)} disabled={isProcessing} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            {isProcessing ? "Vérification..." : `Payer ${method === 'wave' ? 'avec' : 'par'} ${titles[method]}`}
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

    

    
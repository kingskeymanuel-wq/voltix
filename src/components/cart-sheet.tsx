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
import type { CartItem, Product } from "@/lib/types";
import { Minus, Plus, ShoppingCart, Trash2, X, CheckCircle, Smartphone } from "lucide-react";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { MtnLogo, OrangeLogo, WaveLogo } from "./icons";
import { useToast } from "@/hooks/use-toast";
import { AccessoryRecommender } from "./accessory-recommender";

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

type PaymentStep = 'cart' | 'payment' | 'success';

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
  const [orderId, setOrderId] = React.useState('');
  const { toast } = useToast();

  React.useEffect(() => {
    if (isOpen) {
      setStep('cart');
      setIsProcessing(false);
    }
  }, [isOpen]);

  const handleProcessPayment = (method: string) => {
    setIsProcessing(true);
    toast({ title: "Traitement en cours...", description: "Veuillez patienter." });

    setTimeout(() => {
      const newOrderId = 'VOLTIX-' + Date.now().toString().slice(-8);
      setOrderId(newOrderId);
      setIsProcessing(false);
      setStep('success');
      clearCart();
    }, 3000);
  };

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

          {step === 'payment' && (
            <div className="p-1">
              <h3 className="text-xl font-bold mb-4 text-center">💳 Paiement Mobile Sécurisé</h3>
              <Tabs defaultValue="orange" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
                  <TabsTrigger value="orange"><OrangeLogo /></TabsTrigger>
                  <TabsTrigger value="wave"><WaveLogo /></TabsTrigger>
                  <TabsTrigger value="mtn"><MtnLogo /></TabsTrigger>
                </TabsList>
                <div className="mt-4">
                  <PaymentFormWrapper method="orange" onPay={handleProcessPayment} isProcessing={isProcessing} />
                  <PaymentFormWrapper method="wave" onPay={handleProcessPayment} isProcessing={isProcessing} />
                  <PaymentFormWrapper method="mtn" onPay={handleProcessPayment} isProcessing={isProcessing} />
                </div>
              </Tabs>
              <Button variant="link" onClick={() => setStep('cart')} className="w-full mt-4 text-primary">Retour au panier</Button>
            </div>
          )}

          {step === 'success' && (
             <div className="flex flex-col items-center justify-center text-center p-6 h-full">
                <CheckCircle size={64} className="text-accent mb-4"/>
                <h3 className="text-2xl font-bold text-accent mb-2">Paiement confirmé !</h3>
                <p className="text-muted-foreground mb-4">Votre commande a été validée et sera traitée rapidement.</p>
                <Card className="bg-gray-800/50 w-full">
                  <CardHeader>
                    <CardTitle>Référence de commande</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-code text-accent font-bold text-lg">{orderId}</p>
                  </CardContent>
                </Card>
                <SheetClose asChild>
                  <Button className="mt-6 w-full">Fermer</Button>
                </SheetClose>
             </div>
          )}
        </div>
        
        {step !== 'success' && cartItems.length > 0 && (
          <SheetFooter className="p-6 bg-background/80 border-t border-white/10 mt-auto">
            <div className="w-full space-y-4">
                <div className="flex justify-between items-center text-2xl font-black">
                    <span>Total:</span>
                    <span className="text-primary">{cartTotal.toLocaleString()} FCFA</span>
                </div>
                <Button onClick={() => setStep('payment')} size="lg" className="w-full font-bold bg-accent text-accent-foreground hover:bg-accent/90">
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
          <div className="space-y-2">
            <Label htmlFor={`${method}-pin`}>Code PIN</Label>
            <Input id={`${method}-pin`} type="password" placeholder="••••" maxLength={4} />
          </div>
          <Button onClick={() => onPay(method)} disabled={isProcessing} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            {isProcessing ? "Traitement..." : `Confirmer le paiement`}
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

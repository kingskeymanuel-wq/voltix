
"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { ContactBar } from "@/components/contact-bar";
import { ContactModal } from "@/components/contact-modal";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PackageCheck, Truck, MapPin, CheckCircle, Clock, CalendarIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function OrderTrackingPage() {
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [orderId, setOrderId] = React.useState("");
  const [searchId, setSearchId] = React.useState("");
  const [orderStatus, setOrderStatus] = React.useState<number | null>(null);
  const [orderDate, setOrderDate] = React.useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = React.useState({ hours: 0, minutes: 0, seconds: 0 });

  const handleSearch = () => {
    if (searchId) {
      setOrderId(searchId);
      setOrderStatus(2); // Simulating "In Transit"
      setOrderDate(new Date()); // Set order date to now for simulation
    }
  };

  React.useEffect(() => {
    if (orderStatus !== null && orderStatus < 3 && orderDate) {
      const deliveryTime = new Date(orderDate);
      deliveryTime.setHours(deliveryTime.getHours() + 2); // 2 hours from order time

      const interval = setInterval(() => {
        const now = new Date();
        const difference = deliveryTime.getTime() - now.getTime();
        
        if (difference > 0) {
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);
          setTimeLeft({ hours, minutes, seconds });
        } else {
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
          setOrderStatus(3); // Delivered
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [orderStatus, orderDate]);

  const statusSteps = [
    { name: "Validée", icon: PackageCheck },
    { name: "En cours de préparation", icon: Truck },
    { name: "En transit", icon: MapPin },
    { name: "Livrée", icon: CheckCircle },
  ];

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
          <h1 className="text-4xl md:text-5xl font-black text-primary">Suivi de Commande</h1>
          <p className="text-lg text-muted-foreground mt-2">Suivez votre colis en temps réel.</p>
        </div>
        
        <Card className="max-w-2xl mx-auto bg-card/50 border-primary/20 mb-8">
            <CardHeader>
                <CardTitle>Rechercher votre commande</CardTitle>
                <CardDescription>Entrez votre numéro de commande pour voir le statut.</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
                <Input 
                  placeholder="Ex: VOLTIX-12345678" 
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} className="bg-primary text-primary-foreground">
                    Suivre
                </Button>
            </CardContent>
        </Card>

        {orderStatus !== null && orderDate && (
            <Card className="max-w-2xl mx-auto bg-card/50 border-primary/20">
                <CardHeader>
                    <CardTitle>Commande <span className="text-primary">{orderId}</span></CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground pt-1">
                      <CalendarIcon className="mr-2" size={16}/>
                      <span>Commandé le: {orderDate.toLocaleDateString('fr-FR')} à {orderDate.toLocaleTimeString('fr-FR')}</span>
                    </div>
                    <CardDescription className="pt-2">Statut actuel: <span className="font-bold text-accent">{statusSteps[orderStatus].name}</span></CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div>
                        <Progress value={(orderStatus / (statusSteps.length - 1)) * 100} className="h-2 bg-primary/20"/>
                        <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                            {statusSteps.map((step, index) => (
                                <div key={step.name} className={`flex flex-col items-center ${index <= orderStatus ? 'text-primary' : 'text-muted-foreground'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${index <= orderStatus ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                                      <step.icon size={16} />
                                    </div>
                                    <p className="text-xs mt-2">{step.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {orderStatus < 3 && (
                        <div className="text-center p-6 bg-primary/10 rounded-lg">
                           <h3 className="text-lg font-bold flex items-center justify-center gap-2"><Clock/> Temps de livraison estimé</h3>
                           <div className="text-4xl font-black text-accent mt-2">
                               <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
                               <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
                               <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                           </div>
                        </div>
                    )}
                     {orderStatus === 3 && (
                        <div className="text-center p-6 bg-accent/10 rounded-lg">
                           <h3 className="text-lg font-bold text-accent flex items-center justify-center gap-2"><CheckCircle/> Votre commande a été livrée !</h3>
                           <p className="text-muted-foreground mt-2">Merci pour votre confiance.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        )}

      </main>
      <ContactBar onContactClick={() => setIsContactModalOpen(true)} />
      <ContactModal isOpen={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </div>
  );
}

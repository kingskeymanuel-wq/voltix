"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { ContactBar } from "@/components/contact-bar";
import { ContactModal } from "@/components/contact-modal";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ShoppingBag, Heart, Settings } from "lucide-react";

export default function ClientPage() {
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-black to-gray-900/80">
      <ContactBar onContactClick={() => setIsContactModalOpen(true)} />
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
        
        <Card className="max-w-4xl mx-auto bg-card/50 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <User />
              Bonjour, Client VOLTIX
            </CardTitle>
            <CardDescription>Bienvenue dans votre espace personnel sécurisé.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button variant="outline" className="justify-start p-6 text-lg border-primary/30 text-primary hover:bg-primary/10 hover:text-primary">
              <ShoppingBag className="mr-4" />
              Mes Commandes
            </Button>
            <Button variant="outline" className="justify-start p-6 text-lg border-primary/30 text-primary hover:bg-primary/10 hover:text-primary">
              <Heart className="mr-4" />
              Liste de Souhaits
            </Button>
            <Button variant="outline" className="justify-start p-6 text-lg border-primary/30 text-primary hover:bg-primary/10 hover:text-primary">
              <User className="mr-4" />
              Détails du Compte
            </Button>
            <Button variant="outline" className="justify-start p-6 text-lg border-primary/30 text-primary hover:bg-primary/10 hover:text-primary">
              <Settings className="mr-4" />
              Paramètres
            </Button>
          </CardContent>
        </Card>

      </main>
      <ContactModal isOpen={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </div>
  );
}
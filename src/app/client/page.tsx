"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { ContactBar } from "@/components/contact-bar";
import { ContactModal } from "@/components/contact-modal";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ShoppingBag, Heart, Settings, Bell, Lock, Globe, LogOut } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-1 space-y-6">
             <Card className="bg-card/50 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                    <User />
                    Bonjour, Client VOLTIX
                    </CardTitle>
                    <CardDescription>Bienvenue dans votre espace.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
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
                    <Button variant="destructive" className="justify-start p-6 text-lg mt-4">
                        <LogOut className="mr-4" />
                        Déconnexion
                    </Button>
                </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
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
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <ContactModal isOpen={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </div>
  );
}

    
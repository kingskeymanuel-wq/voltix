"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { ContactBar } from "@/components/contact-bar";
import { ContactModal } from "@/components/contact-modal";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function SignupPage() {
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstname') as string;
    const lastName = formData.get('lastname') as string;

    // In a real app, you would send this to your backend for registration.
    // Here, we'll just simulate it.
    
    if (firstName && lastName) {
        // Store user info in localStorage for the demo
        localStorage.setItem('userFirstName', firstName);
        localStorage.setItem('userLastName', lastName);
        
        toast({
            title: "Inscription réussie !",
            description: "Votre compte a été créé avec succès.",
        });
        
        // Redirect to the welcome page
        router.push(`/welcome?name=${encodeURIComponent(firstName)}`);
    } else {
        toast({
            variant: "destructive",
            title: "Erreur",
            description: "Veuillez remplir tous les champs obligatoires.",
        });
    }
  };

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
      <main className="flex-1 flex items-center justify-center container mx-auto px-4 py-12">
        <Card className="w-full max-w-lg bg-card/50 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-black text-primary">Créer un Compte</CardTitle>
            <CardDescription>Rejoignez la famille VOLTIX et profitez d'avantages exclusifs.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSignup}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="firstname">Prénom</Label>
                    <Input id="firstname" name="firstname" placeholder="Ali" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastname">Nom</Label>
                    <Input id="lastname" name="lastname" placeholder="Koné" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Email ou Téléphone</Label>
                <Input id="contact" name="contact" placeholder="email@example.com ou 0X XX XX XX XX" required />
              </div>

               <div className="space-y-2">
                <Label htmlFor="address">Lieu d'habitation</Label>
                <Input id="address" name="address" placeholder="Ex: Cocody Angré" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" required />
              </div>
              
              <Button type="submit" className="w-full font-bold text-lg p-6">
                Créer mon compte
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Vous avez déjà un compte ?{' '}
                <Link href="/login" className="font-bold text-primary hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <ContactModal isOpen={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </div>
  );
}

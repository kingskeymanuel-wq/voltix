
"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { ContactBar } from "@/components/contact-bar";
import { ContactModal } from "@/components/contact-modal";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { KeyRound, Mail } from "lucide-react";

export default function LoginPage() {
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    if (password === 'admin123') {
        toast({
          title: "Connexion réussie",
          description: "Vous allez être redirigé vers votre espace.",
        });
        localStorage.setItem('userFirstName', 'Membre');
        localStorage.setItem('userLastName', 'VOLTIX');
        window.dispatchEvent(new Event('storage'));
        
        setTimeout(() => router.push('/account'), 1500);
    } else {
         toast({
            variant: "destructive",
            title: "Erreur de connexion",
            description: "Mot de passe incorrect.",
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
        <Card className="w-full max-w-md bg-card/50 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-black text-primary">Connexion</CardTitle>
            <CardDescription>Accédez à votre espace client VOLTIX.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">Adresse Email ou Téléphone</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="email" name="email" type="email" placeholder="votre.email@example.com" className="pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                 <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="password" name="password" type="password" placeholder="••••••••" className="pl-10" required />
                </div>
              </div>
              <Button type="submit" className="w-full font-bold text-lg p-6">
                Se connecter
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Nouveau chez VOLTIX ?{' '}
                <Link href="/signup" className="font-bold text-primary hover:underline">
                  Créer un compte
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

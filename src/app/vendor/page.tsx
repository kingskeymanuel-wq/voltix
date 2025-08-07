"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { ContactBar } from "@/components/contact-bar";
import { ContactModal } from "@/components/contact-modal";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingCart, CreditCard, Lock, BarChart2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const salesData = [
  { name: 'Jan', Ventes: 4000, Benefices: 2400 },
  { name: 'Fév', Ventes: 3000, Benefices: 1398 },
  { name: 'Mar', Ventes: 5000, Benefices: 7800 },
  { name: 'Avr', Ventes: 2780, Benefices: 3908 },
  { name: 'Mai', Ventes: 1890, Benefices: 4800 },
  { name: 'Jui', Ventes: 2390, Benefices: 3800 },
  { name: 'Jui', Ventes: 3490, Benefices: 4300 },
];

export default function VendorPage() {
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const { toast } = useToast();

  const handleLogin = () => {
    // In a real app, this would be a secure authentication call
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast({ title: "Connexion réussie", description: "Bienvenue dans l'espace vendeur." });
    } else {
      toast({ variant: "destructive", title: "Erreur de connexion", description: "Mot de passe incorrect." });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900/80">
        <Card className="w-full max-w-sm bg-card/50 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lock /> Espace Vendeur Sécurisé</CardTitle>
            <CardDescription>Veuillez entrer votre mot de passe pour continuer.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full">Se connecter</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <h1 className="text-4xl md:text-5xl font-black text-primary">Tableau de Bord Vendeur</h1>
          <p className="text-lg text-muted-foreground mt-2">Suivi des performances de votre boutique.</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="bg-card/50 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total des Ventes</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">45,231,890 FCFA</div>
                    <p className="text-xs text-muted-foreground">+20.1% depuis le mois dernier</p>
                </CardContent>
            </Card>
            <Card className="bg-card/50 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Bénéfices</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12,234,340 FCFA</div>
                    <p className="text-xs text-muted-foreground">+180.1% depuis le mois dernier</p>
                </CardContent>
            </Card>
            <Card className="bg-card/50 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Crédits</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">2,350,000 FCFA</div>
                    <p className="text-xs text-muted-foreground">+19% depuis le mois dernier</p>
                </CardContent>
            </Card>
        </div>

        <Card className="bg-card/50 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart2 /> Aperçu des Ventes</CardTitle>
            <CardDescription>Performance des ventes pour les 7 derniers mois.</CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `${(value as number)/1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))' 
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend />
                <Line type="monotone" dataKey="Ventes" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Benefices" stroke="hsl(var(--accent))" strokeWidth={2}/>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </main>
      <ContactModal isOpen={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </div>
  );
}

    
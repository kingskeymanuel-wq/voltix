"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { ContactBar } from "@/components/contact-bar";
import { ContactModal } from "@/components/contact-modal";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ShoppingBag, Heart, Settings, Bell, Lock, Globe, LogOut, Home, Truck, CreditCard, Save } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

type ClientView = 'details' | 'orders' | 'wishlist' | 'settings';

const AccountDetails = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [firstName, setFirstName] = React.useState("Client");
    const [lastName, setLastName] = React.useState("VOLTIX");
    const [email, setEmail] = React.useState("client@voltix.ci");
    const [phone, setPhone] = React.useState("+225 01 02 03 04");
    const [isSameAddress, setIsSameAddress] = React.useState(true);

    React.useEffect(() => {
        const storedFirstName = localStorage.getItem('userFirstName');
        const storedLastName = localStorage.getItem('userLastName');
        if (storedFirstName) setFirstName(storedFirstName);
        if (storedLastName) setLastName(storedLastName);
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
        setTimeout(() => router.push('/'), 1500);
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
);

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
  const [userName, setUserName] = React.useState("Client VOLTIX");
  const router = useRouter();

  React.useEffect(() => {
    const storedFirstName = localStorage.getItem('userFirstName');
    const storedLastName = localStorage.getItem('userLastName');
    if (storedFirstName && storedLastName) {
      setUserName(`${storedFirstName} ${storedLastName}`);
    } else {
        // If no user data, redirect to login
        router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
      localStorage.removeItem('userFirstName');
      localStorage.removeItem('userLastName');
      window.dispatchEvent(new Event('storage')); // Trigger update in header
      router.push('/');
  }

  const renderContent = () => {
    switch (activeView) {
        case 'details':
            return <AccountDetails />;
        case 'settings':
            return <AccountSettings />;
        case 'orders':
            return <PlaceholderContent title="Mes Commandes" icon={ShoppingBag} />;
        case 'wishlist':
            return <PlaceholderContent title="Liste de Souhaits" icon={Heart} />;
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
                    Bonjour, {userName}
                    </CardTitle>
                    <CardDescription>Bienvenue dans votre espace.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <NavButton view="details" label="Détails du Compte" icon={User}/>
                    <NavButton view="orders" label="Mes Commandes" icon={ShoppingBag}/>
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
      <ContactModal isOpen={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </div>
  );
}


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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingCart, Users, CreditCard, Lock, BarChart2, Mail, KeyRound, Eye, Phone, Bell, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const salesData = [
  { name: 'Jan', Ventes: 4000, Benefices: 2400 },
  { name: 'Fév', Ventes: 3000, Benefices: 1398 },
  { name: 'Mar', Ventes: 5000, Benefices: 7800 },
  { name: 'Avr', Ventes: 2780, Benefices: 3908 },
  { name: 'Mai', Ventes: 1890, Benefices: 4800 },
  { name: 'Jui', Ventes: 2390, Benefices: 3800 },
  { name: 'Jui', Ventes: 3490, Benefices: 4300 },
];

const mockClients = [
    { id: 'USR-001', name: 'Ali Koné', email: 'ali.kone@example.com', phone: '+225 01234567', totalSpent: 1250000, lastOrder: '2024-05-10', status: 'Actif' },
    { id: 'USR-002', name: 'Fatou Cissé', email: 'fatou.c@example.com', phone: '+225 02345678', totalSpent: 850000, lastOrder: '2024-05-12', status: 'Actif' },
    { id: 'USR-003', name: 'Moussa Diarra', email: 'm.diarra@example.com', phone: '+225 03456789', totalSpent: 230000, lastOrder: '2023-11-20', status: 'Inactif' },
    { id: 'USR-004', name: 'Aïcha Traoré', email: 'a.traore@example.com', phone: '+225 04567890', totalSpent: 3500000, lastOrder: '2024-05-15', status: 'VIP' },
];

const mockOrders = [
    { id: 'VOLTIX-1234', product: 'iPhone 15 Pro Max', date: '2024-05-10', status: 'Livrée' },
    { id: 'VOLTIX-5678', product: 'AirPods Pro 2', date: '2024-04-22', status: 'Livrée' },
    { id: 'VOLTIX-9101', product: 'MacBook Pro 16" M3', date: '2024-02-15', status: 'Annulée' },
];

type VendorView = 'login' | 'forgot-password' | 'reset-password';
type SelectedClient = typeof mockClients[0] | null;

const ClientDetailsModal = ({ client, isOpen, onOpenChange, onAlert }: { client: SelectedClient, isOpen: boolean, onOpenChange: (open: boolean) => void, onAlert: (message: string) => void }) => {
    if (!client) return null;
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl bg-background/95 backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="text-primary text-2xl flex items-center gap-3"><Users /> Détails du Client</DialogTitle>
                    <DialogDescription>
                        Fiche complète du client <span className="font-bold text-primary">{client.name}</span> (ID: {client.id})
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 max-h-[60vh] overflow-y-auto px-2">
                    <Card>
                        <CardHeader><CardTitle>Informations Personnelles</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            <p><strong>Nom:</strong> {client.name}</p>
                            <p><strong>Email:</strong> {client.email}</p>
                            <p><strong>Téléphone:</strong> {client.phone}</p>
                            <p><strong>Statut:</strong> <Badge variant={client.status === 'VIP' ? 'destructive' : 'default'}>{client.status}</Badge></p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle>Statistiques d'Achat</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            <p><strong>Dépense totale:</strong> {client.totalSpent.toLocaleString()} FCFA</p>
                            <p><strong>Dernière commande:</strong> {client.lastOrder}</p>
                            <p><strong>Nombre de commandes:</strong> {mockOrders.length}</p>
                        </CardContent>
                    </Card>
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader><CardTitle>Historique des Commandes</CardTitle></CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID Commande</TableHead><TableHead>Produit</TableHead><TableHead>Date</TableHead><TableHead>Statut</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {mockOrders.map(order => (
                                            <TableRow key={order.id}>
                                                <TableCell>{order.id}</TableCell><TableCell>{order.product}</TableCell><TableCell>{order.date}</TableCell><TableCell>{order.status}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <DialogFooter className="gap-2">
                    <Button onClick={() => onAlert(`Rappel programmé pour ${client.name}.`)}><Bell className="mr-2"/> Planifier un rappel</Button>
                    <Button onClick={() => onAlert(`Alerte envoyée à l'équipe de livraison concernant ${client.name}.`)} variant="outline"><Truck className="mr-2" /> Alerter Livraison/SAV</Button>
                    <DialogClose asChild><Button type="button" variant="secondary">Fermer</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function VendorPage() {
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [view, setView] = React.useState<VendorView>('login');
  const [email, setEmail] = React.useState('');
  const [resetCode, setResetCode] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [selectedClient, setSelectedClient] = React.useState<SelectedClient>(null);
  const [isClientModalOpen, setIsClientModalOpen] = React.useState(false);
  
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast({ title: "Connexion réussie", description: "Bienvenue dans l'espace vendeur." });
    } else {
      toast({ variant: "destructive", title: "Erreur de connexion", description: "Mot de passe incorrect." });
    }
  };

  const handleForgotPassword = () => {
    if (email) {
      toast({ title: "Demande envoyée", description: `Un code de réinitialisation a été envoyé à ${email}.` });
      setView('reset-password');
    } else {
      toast({ variant: "destructive", title: "Erreur", description: "Veuillez entrer une adresse email." });
    }
  };
  
  const handleResetPassword = () => {
    if (resetCode === '123456' && newPassword) {
       toast({ title: "Mot de passe modifié", description: "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe." });
       setView('login');
       setPassword('');
       setNewPassword('');
       setResetCode('');
       setEmail('');
       setTimeout(() => router.push('/'), 1500);
    } else {
       toast({ variant: "destructive", title: "Erreur", description: "Code de réinitialisation invalide ou mot de passe manquant." });
    }
  };

  const handleViewClient = (client: SelectedClient) => {
    setSelectedClient(client);
    setIsClientModalOpen(true);
  }

  const handleAlert = (message: string) => {
    toast({
        title: "Action déclenchée",
        description: message,
    });
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900/80">
        {view === 'login' && (
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
              <Button variant="link" size="sm" className="w-full" onClick={() => setView('forgot-password')}>Mot de passe oublié ?</Button>
            </CardContent>
          </Card>
        )}
        {view === 'forgot-password' && (
           <Card className="w-full max-w-sm bg-card/50 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Mail /> Mot de passe oublié</CardTitle>
              <CardDescription>Entrez votre email pour recevoir un code de réinitialisation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="vendeur@voltix.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleForgotPassword()}
                />
              </div>
              <Button onClick={handleForgotPassword} className="w-full">Envoyer le code</Button>
              <Button variant="link" size="sm" className="w-full" onClick={() => setView('login')}>Retour à la connexion</Button>
            </CardContent>
          </Card>
        )}
        {view === 'reset-password' && (
           <Card className="w-full max-w-sm bg-card/50 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><KeyRound /> Réinitialiser le mot de passe</CardTitle>
              <CardDescription>Entrez le code reçu et votre nouveau mot de passe.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="reset-code">Code de réinitialisation (Ex: 123456)</Label>
                <Input 
                  id="reset-code" 
                  type="text" 
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <Input 
                  id="new-password" 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleResetPassword()}
                />
              </div>
              <Button onClick={handleResetPassword} className="w-full">Modifier le mot de passe</Button>
              <Button variant="link" size="sm" className="w-full" onClick={() => setView('login')}>Retour à la connexion</Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <>
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
          <p className="text-lg text-muted-foreground mt-2">Suivi des performances et gestion des clients.</p>
        </div>
        
        <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-lg mx-auto bg-gray-800/50 mb-8">
                <TabsTrigger value="dashboard"><BarChart2 className="mr-2"/> Tableau de Bord</TabsTrigger>
                <TabsTrigger value="clients"><Users className="mr-2"/> Gestion Clients</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
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
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} labelStyle={{ color: 'hsl(var(--foreground))' }} />
                        <Legend />
                        <Line type="monotone" dataKey="Ventes" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="Benefices" stroke="hsl(var(--accent))" strokeWidth={2}/>
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="clients">
                <Card className="bg-card/50 border-primary/20">
                    <CardHeader>
                        <CardTitle>Liste des Clients</CardTitle>
                        <CardDescription>Retrouvez et gérez tous vos clients enregistrés.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nom</TableHead>
                                    <TableHead className="hidden md:table-cell">Email</TableHead>
                                    <TableHead className="hidden lg:table-cell">Dépense Totale</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockClients.map(client => (
                                    <TableRow key={client.id}>
                                        <TableCell className="font-medium">{client.name}</TableCell>
                                        <TableCell className="hidden md:table-cell text-muted-foreground">{client.email}</TableCell>
                                        <TableCell className="hidden lg:table-cell">{client.totalSpent.toLocaleString()} FCFA</TableCell>
                                        <TableCell><Badge variant={client.status === 'VIP' ? 'destructive' : client.status === 'Actif' ? 'default' : 'secondary'}>{client.status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => handleViewClient(client)}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </main>
      <ClientDetailsModal client={selectedClient} isOpen={isClientModalOpen} onOpenChange={setIsClientModalOpen} onAlert={handleAlert} />
      <ContactModal isOpen={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </div>
    </>
  );
}

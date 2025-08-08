
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
import { DollarSign, ShoppingCart, Users, CreditCard, Lock, BarChart2, Mail, KeyRound, Eye, Bell, Truck, FileSignature, Wrench, PackagePlus, Edit, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import type { Order, SAVTicket, Product } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { allProducts as initialProducts, categories } from "@/data/products";
import { mockClients, mockOrders, initialSavTickets, salesData } from "@/data/vendor";

type VendorView = 'login' | 'forgot-password' | 'reset-password';
type SelectedClient = typeof mockClients[0] | null;
type SelectedProduct = Product | null;

const CreateSavTicketModal = ({ client, isOpen, onOpenChange, onTicketCreated }: { client: SelectedClient, isOpen: boolean, onOpenChange: (open: boolean) => void, onTicketCreated: (ticket: SAVTicket) => void }) => {
    if (!client) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newTicket: SAVTicket = {
            id: `SAV-${Date.now().toString().slice(-4)}`,
            clientId: client.id,
            orderId: formData.get('orderId') as string,
            product: mockOrders.find(o => o.id === formData.get('orderId'))?.items[0].name || 'N/A',
            issue: formData.get('issue') as string,
            status: 'Ouvert',
            date: new Date().toISOString().split('T')[0],
        };
        onTicketCreated(newTicket);
        onOpenChange(false);
    };
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-background/95 backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="text-primary text-2xl flex items-center gap-3"><Wrench /> Créer un Ticket SAV</DialogTitle>
                    <DialogDescription>
                        Ouvrir un nouveau dossier de service après-vente pour {client.name}.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="orderId">Commande Concernée</Label>
                            <Select name="orderId" required>
                                <SelectTrigger id="orderId">
                                    <SelectValue placeholder="Sélectionner une commande" />
                                </SelectTrigger>
                                <SelectContent>
                                    {mockOrders.map(order => (
                                        <SelectItem key={order.id} value={order.id}>
                                            {order.id} - {order.items.map(i => i.name).join(', ')}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="issue">Description du problème</Label>
                            <Textarea id="issue" name="issue" placeholder="Décrivez le problème signalé par le client..." required />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="secondary">Annuler</Button></DialogClose>
                        <Button type="submit">Créer le ticket</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};


const ClientDetailsModal = ({ client, isOpen, onOpenChange, onAlert, savTickets, onTicketCreated }: { client: SelectedClient, isOpen: boolean, onOpenChange: (open: boolean) => void, onAlert: (message: string) => void, savTickets: SAVTicket[], onTicketCreated: (ticket: SAVTicket) => void }) => {
    const [isSavModalOpen, setIsSavModalOpen] = React.useState(false);
    if (!client) return null;

    const clientSavTickets = savTickets.filter(t => t.clientId === client.id);

    const handleCreateTicket = (ticket: SAVTicket) => {
        onTicketCreated(ticket);
    }
    
    return (
        <>
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl bg-background/95 backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="text-primary text-2xl flex items-center gap-3"><Users /> Détails du Client</DialogTitle>
                    <DialogDescription>
                        Fiche complète du client <span className="font-bold text-primary">{client.name}</span> (ID: {client.id})
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 max-h-[60vh] overflow-y-auto px-2">
                 <Tabs defaultValue="info" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="info">Infos & Stats</TabsTrigger>
                        <TabsTrigger value="orders">Commandes</TabsTrigger>
                        <TabsTrigger value="contracts">Contrats</TabsTrigger>
                        <TabsTrigger value="sav"><Wrench className="mr-2"/>SAV</TabsTrigger>
                    </TabsList>
                    <TabsContent value="info" className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    <p><strong>Dépense totale:</strong> {client.totalSpent.toLocaleString('fr-FR')} FCFA</p>
                                    <p><strong>Dernière commande:</strong> {client.lastOrder}</p>
                                    <p><strong>Nombre de commandes:</strong> {mockOrders.length}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                     <TabsContent value="orders" className="mt-4">
                        <Card>
                            <CardHeader><CardTitle>Historique des Commandes</CardTitle></CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead><TableHead>Total</TableHead><TableHead>Date</TableHead><TableHead>Statut</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {mockOrders.map(order => (
                                            <TableRow key={order.id}>
                                                <TableCell>{order.id}</TableCell>
                                                <TableCell>{order.total.toLocaleString('fr-FR')} FCFA</TableCell>
                                                <TableCell>{new Date(order.date).toLocaleDateString('fr-FR')}</TableCell>
                                                <TableCell>{order.status}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="contracts" className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><FileSignature/>Contrats Signés</CardTitle>
                            </CardHeader>
                             <CardContent className="space-y-2">
                                {mockOrders.filter(o => o.signature).map(contract => (
                                    <Accordion type="single" collapsible key={contract.id}>
                                        <AccordionItem value={contract.id}>
                                            <AccordionTrigger className="text-md font-semibold hover:no-underline p-3 bg-background/50 rounded-lg">
                                                <div className="flex-1 text-left">
                                                    <p>Contrat #{contract.id}</p>
                                                    <p className="text-xs font-normal text-muted-foreground">
                                                        Signé par {contract.signature} le {new Date(contract.date).toLocaleDateString('fr-FR')}
                                                    </p>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="space-y-2 pt-3 px-3">
                                                <p><strong>Articles:</strong> {contract.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}</p>
                                                <p><strong>Montant:</strong> {contract.total.toLocaleString('fr-FR')} FCFA</p>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                ))}
                             </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="sav" className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>Tickets SAV</span>
                                    <Button size="sm" onClick={() => setIsSavModalOpen(true)}><Wrench className="mr-2"/> Ouvrir un ticket</Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {clientSavTickets.length > 0 ? (
                                    <Table>
                                        <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Produit</TableHead><TableHead>Date</TableHead><TableHead>Statut</TableHead></TableRow></TableHeader>
                                        <TableBody>
                                            {clientSavTickets.map(ticket => (
                                                <TableRow key={ticket.id}>
                                                    <TableCell>{ticket.id}</TableCell>
                                                    <TableCell>{ticket.product}</TableCell>
                                                    <TableCell>{new Date(ticket.date).toLocaleDateString('fr-FR')}</TableCell>
                                                    <TableCell><Badge variant={ticket.status === 'Ouvert' ? 'destructive' : 'default'}>{ticket.status}</Badge></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : <p className="text-muted-foreground text-center p-4">Aucun ticket SAV pour ce client.</p>}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
                </div>
                <DialogFooter className="gap-2 flex-wrap">
                    <Button onClick={() => onAlert(`Rappel programmé pour ${client.name}.`)}><Bell className="mr-2"/> Planifier un rappel</Button>
                    <DialogClose asChild><Button type="button" variant="secondary">Fermer</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        <CreateSavTicketModal client={client} isOpen={isSavModalOpen} onOpenChange={setIsSavModalOpen} onTicketCreated={handleCreateTicket} />
        </>
    )
}

const ProductEditModal = ({ product, isOpen, onOpenChange, onProductUpdate }: { product: SelectedProduct, isOpen: boolean, onOpenChange: (open: boolean) => void, onProductUpdate: (product: Product) => void }) => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [description, setDescription] = React.useState("");
    const [category, setCategory] = React.useState("");

    React.useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
        } else {
            // Reset for new product
            setName("");
            setPrice(0);
            setDescription("");
            setCategory(categories[1].key); // Default to smartphones
        }
    }, [product]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedProduct: Product = product 
            ? { ...product, name, price, description, category }
            : {
                id: `p${Date.now()}`,
                name,
                price,
                description,
                category,
                image: 'https://placehold.co/600x400', // Placeholder for new products
                dataAiHint: 'new product'
            };
        onProductUpdate(updatedProduct);
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-background/95 backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="text-primary text-2xl flex items-center gap-3">
                        {product ? <Edit/> : <PackagePlus />}
                        {product ? "Modifier le Produit" : "Ajouter un Produit"}
                    </DialogTitle>
                    <DialogDescription>
                        {product ? `Modification de ${product.name}` : "Ajouter un nouvel article au catalogue."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="product-name">Nom du produit</Label>
                            <Input id="product-name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="product-price">Prix (FCFA)</Label>
                                <Input id="product-price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="product-category">Catégorie</Label>
                                <Select value={category} onValueChange={setCategory} name="category" required>
                                    <SelectTrigger id="product-category">
                                        <SelectValue placeholder="Sélectionner une catégorie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.filter(c => c.key !== 'all').map(cat => (
                                            <SelectItem key={cat.key} value={cat.key}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="product-description">Description</Label>
                            <Textarea id="product-description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="secondary">Annuler</Button></DialogClose>
                        <Button type="submit">{product ? "Enregistrer les modifications" : "Ajouter le produit"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};


export default function VendorPage() {
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [vendorPassword, setVendorPassword] = React.useState('admin123');
  const [view, setView] = React.useState<VendorView>('login');
  const [email, setEmail] = React.useState('');
  const [resetCode, setResetCode] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [selectedClient, setSelectedClient] = React.useState<SelectedClient>(null);
  const [isClientModalOpen, setIsClientModalOpen] = React.useState(false);
  const [savTickets, setSavTickets] = React.useState<SAVTicket[]>(initialSavTickets);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = React.useState<SelectedProduct>(null);
  const [isProductModalOpen, setIsProductModalOpen] = React.useState(false);
  
  const { toast } = useToast();
  const router = useRouter();
  
  React.useEffect(() => {
    const storedProducts = localStorage.getItem('voltix-products');
    setProducts(storedProducts ? JSON.parse(storedProducts) : initialProducts);
  }, []);

  const persistProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('voltix-products', JSON.stringify(updatedProducts));
    // Dispatch a storage event to notify other tabs/pages (like home)
    window.dispatchEvent(new Event('storage'));
  };

  const handleLogin = () => {
    if (password === vendorPassword) {
      setIsAuthenticated(true);
      toast({ title: "Connexion réussie", description: "Bienvenue dans l'espace vendeur." });
    } else {
      toast({ variant: "destructive", title: "Erreur de connexion", description: "Mot de passe incorrect." });
    }
  };

  const handleForgotPassword = () => {
    if (email) {
      toast({ title: "Demande envoyée", description: `Un code de réinitialisation a été envoyé à ${email}. (Code de démo: 123456)` });
      setView('reset-password');
    } else {
      toast({ variant: "destructive", title: "Erreur", description: "Veuillez entrer une adresse email." });
    }
  };
  
  const handleResetPassword = () => {
    if (resetCode === '123456' && newPassword) {
       setVendorPassword(newPassword);
       toast({ title: "Mot de passe modifié", description: "Votre nouveau mot de passe est actif. Vous êtes maintenant connecté." });
       setIsAuthenticated(true);
       setPassword('');
       setNewPassword('');
       setResetCode('');
       setEmail('');
       setView('login');
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

  const handleCreateTicket = (ticket: SAVTicket) => {
    setSavTickets(prev => [...prev, ticket]);
    toast({
        title: "Ticket SAV créé",
        description: `Le ticket ${ticket.id} a été ouvert pour ${selectedClient?.name}.`,
    });
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };
  
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsProductModalOpen(true);
  };
  
  const handleProductUpdate = (product: Product) => {
    let updatedProducts;
    if (products.some(p => p.id === product.id)) {
        // Update existing product
        updatedProducts = products.map(p => p.id === product.id ? product : p);
        toast({ title: "Produit mis à jour", description: `${product.name} a été modifié.` });
    } else {
        // Add new product
        updatedProducts = [product, ...products];
        toast({ title: "Produit ajouté", description: `${product.name} est maintenant en vente.` });
    }
    persistProducts(updatedProducts);
  };


  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900/80 p-4">
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
                <Label htmlFor="reset-code">Code de réinitialisation</Label>
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
              <Button onClick={handleResetPassword} className="w-full">Modifier et se connecter</Button>
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
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto bg-gray-800/50 mb-8">
                <TabsTrigger value="dashboard"><BarChart2 className="mr-2"/> Tableau de Bord</TabsTrigger>
                <TabsTrigger value="clients"><Users className="mr-2"/> Gestion Clients</TabsTrigger>
                <TabsTrigger value="products"><ShoppingCart className="mr-2"/> Gestion Produits</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card className="bg-card/50 border-white/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">45,231,890 FCFA</div>
                            <p className="text-xs text-muted-foreground">+20.1% depuis le mois dernier</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-white/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Nombre de Ventes</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+123</div>
                            <p className="text-xs text-muted-foreground">+15.3% depuis le mois dernier</p>
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
                            <CardTitle className="text-sm font-medium">Crédits Actifs</CardTitle>
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
                                        <TableCell className="hidden lg:table-cell">{client.totalSpent.toLocaleString('fr-FR')} FCFA</TableCell>
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
             <TabsContent value="products">
                <Card className="bg-card/50 border-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Gestion du Catalogue</CardTitle>
                            <CardDescription>Ajoutez, modifiez ou supprimez des produits.</CardDescription>
                        </div>
                        <Button onClick={handleAddProduct}>
                            <PackagePlus className="mr-2"/> Ajouter un produit
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Produit</TableHead>
                                    <TableHead>Catégorie</TableHead>
                                    <TableHead>Prix</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map(product => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell className="hidden md:table-cell text-muted-foreground">{product.category}</TableCell>
                                        <TableCell>{product.price.toLocaleString('fr-FR')} FCFA</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                                                <Edit className="h-4 w-4" />
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
      <ContactBar onContactClick={() => setIsContactModalOpen(true)} />
      <ClientDetailsModal client={selectedClient} isOpen={isClientModalOpen} onOpenChange={setIsClientModalOpen} onAlert={handleAlert} savTickets={savTickets} onTicketCreated={handleCreateTicket} />
      <ProductEditModal product={selectedProduct} isOpen={isProductModalOpen} onOpenChange={setIsProductModalOpen} onProductUpdate={handleProductUpdate} />
      <ContactModal isOpen={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </div>
    </>
  );
}

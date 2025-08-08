
"use client";

import Link from "next/link";
import * as React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  Store,
  Truck,
  HelpCircle,
} from "lucide-react";
import { LightningIcon } from "./icons";
import { AnimatePresence, motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onContactClick: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const Header = ({
  cartCount,
  onCartClick,
  onContactClick,
  searchTerm,
  setSearchTerm,
}: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState("");

  React.useEffect(() => {
    const checkUser = () => {
      const userFirstName = localStorage.getItem("userFirstName");
      if (userFirstName) {
        setIsLoggedIn(true);
        setUserName(userFirstName);
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };

    checkUser();

    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/90 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <LightningIcon />
            <span className="text-2xl font-black font-headline text-primary hidden sm:inline-block animate-glow">
              VOLTIX
            </span>
          </Link>

          <div className="hidden lg:flex flex-1 justify-center">
            <div className="relative w-full max-w-lg">
              <Input
                type="search"
                placeholder="Rechercher un produit, une marque..."
                className="w-full rounded-full bg-secondary/50 border-primary/20 pl-12 pr-4 py-2 text-white placeholder:text-muted-foreground"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            <Button variant="ghost" asChild>
              <Link href="/suivi-commande">Suivi Commande</Link>
            </Button>
            <Button variant="ghost" onClick={onContactClick}>Support</Button>
            
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full">
                    <User className="mr-2" /> Bonjour, {userName}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link href="/account">Mon Espace</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/account?view=orders">Mes Commandes</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                   <DropdownMenuItem asChild><Link href="/vendor">Espace Vendeur</Link></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
               <Button asChild>
                  <Link href="/login" className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-full">
                    <User className="mr-2" /> Connexion
                  </Link>
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Button>
          </nav>

          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu />
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-4 border-t border-primary/10">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="w-full rounded-full bg-secondary/50 border-primary/20 pl-12"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
              </div>
              <nav className="flex flex-col gap-2">
                <Button variant="ghost" className="justify-start gap-2" asChild><Link href="/"><Store />Boutique</Link></Button>
                <Button variant="ghost" className="justify-start gap-2" asChild><Link href="/suivi-commande"><Truck/>Suivi</Link></Button>
                <Button variant="ghost" className="justify-start gap-2" onClick={onContactClick}><HelpCircle/>Support</Button>
                 {isLoggedIn ? (
                    <Button variant="ghost" className="justify-start gap-2" asChild><Link href="/account"><User/>Mon Compte</Link></Button>
                ) : (
                    <Button variant="ghost" className="justify-start gap-2" asChild><Link href="/login"><User/>Connexion</Link></Button>
                )}
                 <Button variant="ghost" className="justify-start gap-2" onClick={onCartClick}>
                    <ShoppingCart /> Panier ({cartCount})
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

    
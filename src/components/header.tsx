"use client";

import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import { LightningIcon } from "./icons";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onContactClick: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const Header = ({ cartCount, onCartClick, onContactClick, searchTerm, setSearchTerm }: HeaderProps) => {
  const handleScrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/90 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <LightningIcon />
            <span className="text-2xl font-black text-primary hidden sm:inline-block">
              VOLTIX SMART
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" asChild>
              <Link href="/">Accueil</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/#products">Produits</Link>
            </Button>
            <Button variant="ghost" onClick={onContactClick}>Contact</Button>
             <Button variant="ghost" asChild>
              <Link href="/suivi-commande">Suivi Commande</Link>
            </Button>
          </nav>
          
          <div className="flex flex-1 items-center justify-end gap-2">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-10 w-48 md:w-64 focus:w-56 md:focus:w-72 transition-all duration-300 rounded-full border-primary/30 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,212,255,0.2)]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Button variant="ghost" size="icon" asChild>
                <Link href="/client">
                    <User />
                    <span className="sr-only">Espace Client</span>
                </Link>
            </Button>

            <Button onClick={onCartClick} className="relative rounded-full bg-gradient-to-r from-primary to-blue-600 text-primary-foreground font-bold hover:scale-105 hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] transition-all duration-300">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Panier
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white p-0 shadow-lg">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};


"use client";

import Link from "next/link";
import * as React from "react";
import { Button } from "./ui/button";
import { BookOpen } from "lucide-react";

interface HeaderProps {
  onContactClick: () => void;
}

export const Header = ({ onContactClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/90 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <BookOpen className="text-primary h-8 w-8"/>
            <span className="text-2xl font-black font-headline text-primary hidden sm:inline-block animate-glow">
              BIBLE AVENTURE
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            <Button variant="ghost" asChild>
              <Link href="/">Accueil</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/#adventures">Aventures</Link>
            </Button>
            <Button variant="ghost" onClick={onContactClick}>Contact</Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

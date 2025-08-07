"use client";

import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";

interface ContactBarProps {
  onContactClick: () => void;
}

export const ContactBar = ({ onContactClick }: ContactBarProps) => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-black border-b border-white/10 py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-primary">
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>+225 0554796919</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>kingskeymanuel@gmail.com</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <MapPin size={16} />
            <span>Abidjan, Koumassi - Côte d'Ivoire</span>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <Clock size={16} />
            <span>24h/7j Service Client</span>
          </div>
          <Button
            onClick={onContactClick}
            size="sm"
            className="bg-gradient-to-r from-primary to-blue-600 hover:scale-105 transition-transform duration-300 text-primary-foreground rounded-full px-4 py-1 h-auto"
          >
            <MessageSquare size={16} className="mr-2" />
            Contacter
          </Button>
        </div>
      </div>
    </div>
  );
};

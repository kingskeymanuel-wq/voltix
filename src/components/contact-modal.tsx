"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Phone, MessageSquare, Mail, MapPin, Truck, Wrench, Sparkles } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const contactMethods = [
    { icon: Phone, title: "Hotline Premium", lines: ["+225 07000000", "+225 05000000"], note: "Appel gratuit 24h/7j" },
    { icon: MessageSquare, title: "Chat en Direct", lines: ["WhatsApp Business", "+225 07000000"], note: "Réponse instantanée" },
    { icon: Mail, title: "Email Support", lines: ["support@voltixsmart.ci", "vip@voltixsmart.ci"], note: "Réponse sous 2h" },
    { icon: MapPin, title: "Showroom Abidjan", lines: ["Cocody, Riviera Palmeraie", "Face RTI, Immeuble VOLTIX"], note: "Lun-Sam: 8h-20h" },
    { icon: Truck, title: "Suivi Livraison", lines: ["Tracking GPS en temps réel", "+225 07111111"], note: "Livraison express CI" },
    { icon: Wrench, title: "SAV Technique", lines: ["Réparation & Garantie", "technique@voltixsmart.ci"], note: "Experts certifiés" },
];


export const ContactModal = ({ isOpen, onOpenChange }: ContactModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-gradient-to-br from-black via-gray-900 to-black border-primary/20 text-white p-0">
        <DialogHeader className="p-6 bg-primary/10 rounded-t-lg">
          <DialogTitle className="text-3xl font-black text-primary flex items-center gap-3"><MessageSquare /> Service Client VOLTIX</DialogTitle>
          <DialogDescription className="text-white/80 text-base">
            Notre équipe d'experts est disponible 24h/7j pour vous accompagner et répondre à toutes vos questions.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
                <Card key={index} className="bg-primary/5 hover:bg-primary/10 border-primary/20 hover:border-primary transition-all duration-300 text-center flex flex-col items-center p-6">
                    <CardContent className="flex flex-col items-center p-0">
                        <method.icon className="w-12 h-12 text-primary mb-4"/>
                        <h4 className="text-lg font-bold text-white mb-2">{method.title}</h4>
                        {method.lines.map((line, i) => <p key={i} className="text-white/80">{line}</p>)}
                        <p className="text-primary text-sm mt-2 font-semibold">{method.note}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
        <div className="p-6 pt-0">
            <div className="text-center mt-4 p-4 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg border border-primary/20">
                <h4 className="font-bold text-primary flex items-center justify-center gap-2"><Sparkles size={16}/>Engagement Qualité</h4>
                <p className="text-sm text-white/80">Satisfaction client garantie • Produits authentiques • Livraison sécurisée • SAV premium</p>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

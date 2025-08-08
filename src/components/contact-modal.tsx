
"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Card, CardContent } from "./ui/card";
import { Phone, Mail, MessageSquare, Briefcase, Users, HelpCircle } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const contactMethods = [
    { icon: Mail, title: "Support Client", lines: ["support@voltix.ci", "sav@voltix.ci"], note: "Réponse sous 24h" },
    { icon: Phone, title: "Ligne Directe", lines: ["+225 01 02 03 04 05", "+225 07 08 09 10 11"], note: "Lun-Sam, 8h-18h" },
    { icon: MessageSquare, title: "WhatsApp Business", lines: ["Discutez avec un conseiller"], note: "Réponse rapide" },
    { icon: Briefcase, title: "Entreprises & Pro", lines: ["pro@voltix.ci"], note: "Solutions sur mesure" },
    { icon: Users, title: "Recrutement", lines: ["carrieres@voltix.ci"], note: "Rejoignez notre équipe" },
    { icon: HelpCircle, title: "FAQ & Aide", lines: ["Consultez notre guide"], note: "Réponses instantanées" },
];


export const ContactModal = ({ isOpen, onOpenChange }: ContactModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border-primary/20 text-white p-0">
        <DialogHeader className="p-6 bg-primary/10 rounded-t-lg">
          <DialogTitle className="text-3xl font-black font-headline text-primary flex items-center gap-3"><MessageSquare /> Contacter VOLTIX SMART</DialogTitle>
          <DialogDescription className="text-white/80 text-base">
            Notre équipe est à votre disposition pour toute question ou assistance.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
                <Card key={index} className="bg-primary/5 hover:bg-primary/10 border-primary/20 hover:border-primary transition-all duration-300 text-center flex flex-col items-center p-6">
                    <CardContent className="flex flex-col items-center p-0">
                        <method.icon className="w-12 h-12 text-primary mb-4"/>
                        <h4 className="text-lg font-bold font-headline text-white mb-2">{method.title}</h4>
                        {method.lines.map((line, i) => <p key={i} className="text-white/80">{line}</p>)}
                        <p className="text-primary text-sm mt-2 font-semibold">{method.note}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

    
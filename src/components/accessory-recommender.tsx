"use client"

import * as React from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Sparkles, ShoppingCart, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getAccessoryRecommendations } from "@/ai/flows/accessory-recommendations"
import type { CartItem, Product } from "@/lib/types"

interface AccessoryRecommenderProps {
  cartItems: CartItem[]
  addToCart: (product: Product) => void
}

type Recommendation = {
  name: string
  description: string
}

export function AccessoryRecommender({ cartItems, addToCart }: AccessoryRecommenderProps) {
  const [recommendations, setRecommendations] = React.useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const { toast } = useToast()

  const handleGetRecommendations = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Le panier est vide",
        description: "Ajoutez des produits pour obtenir des recommandations.",
        variant: "destructive",
      })
      return
    }
    setIsLoading(true)
    setRecommendations([])
    try {
      const input = {
        cartItems: cartItems.map((item) => ({
          name: item.name,
          category: item.category,
          description: item.description,
        })),
      }
      const result = await getAccessoryRecommendations(input)
      setRecommendations(result.recommendations)
    } catch (error) {
      console.error("Error getting recommendations:", error)
      toast({
        title: "Erreur de recommandation",
        description: "Impossible de générer des recommandations pour le moment.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddRecommendationToCart = (rec: Recommendation) => {
    // This is a simulation. In a real app, you'd look up the full product details.
    const product: Product = {
      id: `rec-${rec.name.replace(/\s+/g, '-')}`,
      name: rec.name,
      description: rec.description,
      price: Math.floor(Math.random() * (50000 - 10000) + 10000), // Random price for demo
      category: 'accessories',
      image: 'https://placehold.co/100x100',
      dataAiHint: 'tech accessory'
    };
    addToCart(product);
  }

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Sparkles />
          Recommandations IA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.length === 0 && !isLoading && (
          <>
            <p className="text-sm text-muted-foreground">
              Laissez notre IA vous suggérer les accessoires parfaits pour vos articles.
            </p>
            <Button onClick={handleGetRecommendations} className="w-full">
              Obtenir des recommandations
            </Button>
          </>
        )}
        
        {isLoading && (
          <div className="flex justify-center items-center p-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4">Analyse de votre panier...</p>
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-bold">Accessoires suggérés :</h4>
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-background/50">
                <div>
                  <p className="font-semibold">{rec.name}</p>
                  <p className="text-xs text-muted-foreground">{rec.description}</p>
                </div>
                <Button size="icon" variant="ghost" className="text-primary" onClick={() => handleAddRecommendationToCart(rec)}>
                  <ShoppingCart size={16} />
                </Button>
              </div>
            ))}
            <Button onClick={handleGetRecommendations} variant="link" className="w-full text-primary">
              <Sparkles className="mr-2 h-4 w-4" />
              Générer de nouvelles recommandations
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

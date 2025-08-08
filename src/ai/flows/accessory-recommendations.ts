
'use server';

/**
 * @fileOverview An AI agent that recommends accessories for products in a user's cart.
 *
 * - getAccessoryRecommendations - A function that takes a cart as input and returns accessory recommendations.
 * - AccessoryRecommendationsInput - The input type for the getAccessoryRecommendations function.
 * - AccessoryRecommendationsOutput - The return type for the getAccessoryRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AccessoryRecommendationsInputSchema = z.object({
  cartItems: z.array(
    z.object({
      name: z.string().describe('Le nom du produit dans le panier.'),
      category: z.string().describe('La catégorie du produit.'),
      description: z.string().describe('Une courte description du produit.'),
    })
  ).describe('Les articles actuellement dans le panier de l\'utilisateur.'),
});
export type AccessoryRecommendationsInput = z.infer<typeof AccessoryRecommendationsInputSchema>;

const AccessoryRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      name: z.string().describe('Le nom de l\'accessoire recommandé.'),
      description: z.string().describe('Une courte description de l\'accessoire.'),
    })
  ).describe('Une liste d\'accessoires recommandés pour les produits dans le panier.'),
});
export type AccessoryRecommendationsOutput = z.infer<typeof AccessoryRecommendationsOutputSchema>;

export async function getAccessoryRecommendations(input: AccessoryRecommendationsInput): Promise<AccessoryRecommendationsOutput> {
  return accessoryRecommendationsFlow(input);
}

const accessoryRecommendationsPrompt = ai.definePrompt({
  name: 'accessoryRecommendationsPrompt',
  input: {schema: AccessoryRecommendationsInputSchema},
  output: {schema: AccessoryRecommendationsOutputSchema},
  prompt: `Tu es un assistant IA spécialisé dans la recommandation d'accessoires pour les produits électroniques.

  Étant donné les produits dans le panier de l'utilisateur, suggère des accessoires pertinents qui amélioreraient son expérience.

  La réponse doit être une liste de noms de produits et de descriptions.

  Produits dans le panier :
  {{#each cartItems}}
  - {{this.name}} ({{this.category}}): {{this.description}}
  {{/each}}`,
});

const accessoryRecommendationsFlow = ai.defineFlow(
  {
    name: 'accessoryRecommendationsFlow',
    inputSchema: AccessoryRecommendationsInputSchema,
    outputSchema: AccessoryRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await accessoryRecommendationsPrompt(input);
    return output!;
  }
);

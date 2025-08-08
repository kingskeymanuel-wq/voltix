
'use server';

/**
 * @fileOverview Un agent IA qui agit comme un vendeur expert et un consultant pour VOLTIX SMART.
 * 
 * - suggestProducts - Une fonction qui prend une question d'utilisateur et retourne soit des suggestions de produits, soit des réponses commerciales/marketing.
 * - ProductSuggesterInput - Le type d'entrée pour la fonction suggestProducts.
 * - ProductSuggesterOutput - Le type de retour pour la fonction suggestProducts.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { allProducts } from '@/data/products';
import { findClientByName, getClientOrders, getSavTickets } from '../tools/vendor-tools';

const ProductSuggesterInputSchema = z.object({
  query: z.string().describe("La question de l'utilisateur sur les produits, les clients ou des stratégies commerciales."),
});
export type ProductSuggesterInput = z.infer<typeof ProductSuggesterInputSchema>;

const ProductSuggesterOutputSchema = z.object({
  products: z.array(
    z.object({
      id: z.string().describe("L'ID du produit."),
      name: z.string().describe("Le nom du produit."),
      description: z.string().describe("Une description courte et percutante du produit et pourquoi il est pertinent pour la demande de l'utilisateur."),
      price: z.number().describe('Le prix du produit.'),
      image: z.string().describe("L'URL de l'image du produit."),
      dataAiHint: z.string().describe("L'indice IA pour l'image."),
    })
  ).optional().describe('Une liste de produits suggérés.'),
  answer: z.string().optional().describe("Une réponse directe à la question de l'utilisateur si elle ne concerne pas une suggestion de produit."),
});
export type ProductSuggesterOutput = z.infer<typeof ProductSuggesterOutputSchema>;

export async function suggestProducts(input: ProductSuggesterInput): Promise<ProductSuggesterOutput> {
  return productSuggesterFlow(input);
}

const productContext = allProducts.map(p => `- ${p.name}: ${p.description} (ID: ${p.id}, Catégorie: ${p.category})`).join('\n');

const productSuggesterPrompt = ai.definePrompt({
  name: 'productSuggesterPrompt',
  input: { schema: ProductSuggesterInputSchema },
  output: { schema: ProductSuggesterOutputSchema },
  tools: [findClientByName, getClientOrders, getSavTickets],
  prompt: `Tu es VOLTY, l'assistant IA expert de "VOLTIX SMART", une boutique en ligne spécialisée dans les produits électroniques haut de gamme. Tu es serviable, compétent et commercial.

Tes rôles sont :

1.  **Conseiller de Vente Expert**:
    *   Si la question de l'utilisateur concerne une recherche de produit (ex: "je cherche un téléphone puissant", "un laptop pour le design"), suggère 1 à 3 produits pertinents de la liste ci-dessous.
    *   La description de chaque produit doit être réécrite pour être percutante et mettre en avant les points forts répondant au besoin de l'utilisateur.

2.  **Assistant de Service Client**:
    *   Si l'utilisateur pose une question sur un client spécifique (par ex. "infos sur Ali Koné"), ses commandes ou ses tickets SAV, utilise les outils disponibles (findClientByName, getClientOrders, getSavTickets) pour trouver l'information.
    *   Résume les informations trouvées par les outils dans le champ 'answer'.
    *   Ne suggère pas de produits dans ce cas.

3.  **Consultant Commercial et Marketing**:
    *   Si la question est d'ordre général, commercial ou marketing (ex: "quelle promotion pour la fête des pères ?", "fais un post pour le nouvel iPhone"), fournis une réponse créative et pertinente dans le champ 'answer'.
    *   Tu peux te baser sur la liste de produits pour inspirer tes stratégies.

- Si tu ne peux pas répondre, admets-le poliment.
- Sois toujours direct et professionnel dans tes réponses.

Voici la liste des produits disponibles :
${productContext}

Question de l'utilisateur :
"{{query}}"`,
});

const productSuggesterFlow = ai.defineFlow(
  {
    name: 'productSuggesterFlow',
    inputSchema: ProductSuggesterInputSchema,
    outputSchema: ProductSuggesterOutputSchema,
  },
  async (input) => {
    const { output } = await productSuggesterPrompt(input);
    
    if (output?.products) {
      const enrichedProducts = output.products.map(p => {
          const fullProduct = allProducts.find(item => item.id === p.id);
          return {
              ...p,
              price: fullProduct?.price || 0,
              image: fullProduct?.image || 'https://placehold.co/600x400',
              dataAiHint: fullProduct?.dataAiHint || 'tech product'
          };
      });
      return { ...output, products: enrichedProducts };
    }
    
    return output!;
  }
);

    
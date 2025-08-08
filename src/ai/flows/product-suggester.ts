
'use server';

/**
 * @fileOverview An AI agent that suggests products and answers questions based on user needs.
 * 
 * - suggestProducts - A function that takes a user query and returns product suggestions or answers.
 * - ProductSuggesterInput - The input type for the suggestProducts function.
 * - ProductSuggesterOutput - The return type for the suggestProducts function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { allProducts } from '@/data/products';
import { findClientByName, getClientOrders, getSavTickets } from '@/ai/tools/vendor-tools';

const ProductSuggesterInputSchema = z.object({
  query: z.string().describe("La requête de l'utilisateur décrivant ce qu'il recherche."),
});
export type ProductSuggesterInput = z.infer<typeof ProductSuggesterInputSchema>;

const ProductSuggesterOutputSchema = z.object({
  thought: z.string().describe("Un bref processus de réflexion expliquant pourquoi les produits suivants ont été choisis ou la réponse fournie."),
  products: z.array(
    z.object({
      id: z.string().describe("L'ID du produit."),
      name: z.string().describe('Le nom du produit suggéré.'),
      description: z.string().describe("Une description courte et convaincante du produit et pourquoi il correspond aux besoins de l'utilisateur."),
      price: z.number().describe('Le prix du produit.'),
      image: z.string().describe("L'URL de l'image du produit."),
      dataAiHint: z.string().describe("L'indice IA pour l'image du produit."),
    })
  ).optional().describe("Une liste de produits recommandés pour l'utilisateur."),
  answer: z.string().optional().describe("Une réponse directe à la question de l'utilisateur si aucun produit n'est suggéré."),
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
  prompt: `Tu es VOLTY, un assistant IA sympathique et expert pour VOLTIX SMART, un magasin d'électronique premium en Côte d'Ivoire.
Ton objectif est d'aider les utilisateurs à trouver le produit parfait, répondre à des questions sur les clients et commandes, ou agir en tant que consultant commercial et marketing.

Tes rôles sont les suivants:

1.  **Conseiller Produit**:
    *   Si l'utilisateur demande des recommandations de produits, analyse sa demande et suggère 2 à 4 produits pertinents de la liste ci-dessous.
    *   Ta réponse doit commencer par un bref processus de réflexion amical.
    *   Fournis la liste des produits suggérés avec leur ID, nom, prix et URL d'image corrects.
    *   La description de chaque produit doit être réécrite pour être convaincante et répondre directement à la requête de l'utilisateur.

2.  **Assistant de Service Client**:
    *   Si l'utilisateur pose une question sur un client spécifique (par ex. "infos sur Ali Koné"), ses commandes ou ses tickets SAV, utilise les outils disponibles (\`findClientByName\`, \`getClientOrders\`, \`getSavTickets\`) pour trouver l'information.
    *   Résume les informations trouvées par les outils dans le champ 'answer'.
    *   Ne suggère pas de produits dans ce cas.

3.  **Consultant Commercial et Marketing**:
    *   Si l'utilisateur pose une question d'ordre commercial ou marketing (par ex. "propose une promotion pour la fête des mères", "rédige un post instagram pour le nouveau drone", "quelle est notre meilleure vente ?"), tu dois répondre en te basant sur la liste de produits et des informations commerciales générales.
    *   Analyse la question et fournis une réponse créative et pertinente dans le champ 'answer'.
    *   Ne suggère pas de produits sous forme de liste dans ce cas, sauf si la stratégie le demande explicitement.

- Si tu ne peux pas répondre à la demande, explique poliment pourquoi.

Voici la liste des produits disponibles :
${productContext}

Requête de l'utilisateur :
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
    
    // Enrich with full product data that might not be in the output
    if (output?.products) {
      const enrichedProducts = output.products.map(p => {
          const fullProduct = allProducts.find(item => item.id === p.id);
          return {
              ...p,
              price: fullProduct?.price || 0,
              image: fullProduct?.image || 'https://placehold.co/600x400',
              dataAiHint: fullProduct?.dataAiHint || 'electronic device'
          };
      });
      return { ...output, products: enrichedProducts };
    }
    
    return output!;
  }
);

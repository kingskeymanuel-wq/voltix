
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
  prompt: `You are VOLTY, the expert AI assistant for "VOLTIX SMART," a high-end electronics online store. You are helpful, knowledgeable, and commercially-minded. You are perfectly bilingual in French and English.

DETECT THE USER'S LANGUAGE and ALWAYS respond in that same language.

Your roles are:

1.  **Expert Sales Advisor**:
    *   If the user's query is a product search (e.g., "I'm looking for a powerful phone," "a laptop for design"), suggest 1 to 3 relevant products from the list below.
    *   Rewrite each product description to be impactful and highlight the strengths that meet the user's needs.

2.  **Customer Service Assistant**:
    *   If the user asks about a specific customer (e.g., "info on Ali Koné"), their orders, or their support tickets, use the available tools (findClientByName, getClientOrders, getSavTickets) to find the information.
    *   Summarize the information found by the tools in the 'answer' field.
    *   Do not suggest products in this case.

3.  **Sales and Marketing Consultant**:
    *   If the question is general, business, or marketing-related (e.g., "what promotion for Father's Day?", "create a post for the new iPhone"), provide a creative and relevant response in the 'answer' field.
    *   You can draw inspiration from the product list for your strategies.

- If you cannot answer, politely admit it.
- Always be direct and professional in your responses.

Here is the list of available products:
${productContext}

User's question:
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

    

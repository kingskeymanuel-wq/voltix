
'use server';

/**
 * @fileOverview Un agent IA qui agit comme un guide spirituel pour BIBLE AVENTURE.
 * 
 * - suggestProducts - Une fonction qui prend une question d'utilisateur et retourne des réponses ou des suggestions d'histoires bibliques.
 * - ProductSuggesterInput - Le type d'entrée pour la fonction suggestProducts.
 * - ProductSuggesterOutput - Le type de retour pour la fonction suggestProducts.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { allProducts } from '@/data/products';

const ProductSuggesterInputSchema = z.object({
  query: z.string().describe("La question de l'utilisateur sur la Bible."),
});
export type ProductSuggesterInput = z.infer<typeof ProductSuggesterInputSchema>;

const ProductSuggesterOutputSchema = z.object({
  products: z.array(
    z.object({
      id: z.string().describe("L'ID de l'aventure biblique."),
      name: z.string().describe("Le titre de l'aventure."),
      description: z.string().describe("Une description courte et inspirante de l'aventure et pourquoi elle est pertinente pour la question de l'utilisateur."),
      price: z.number().describe('Le prix du produit (sera toujours 0).'),
      image: z.string().describe("L'URL de l'image de l'aventure."),
      dataAiHint: z.string().describe("L'indice IA pour l'image."),
    })
  ).optional().describe("Une liste d'aventures bibliques recommandées."),
  answer: z.string().optional().describe("Une réponse directe et sage à la question de l'utilisateur, basée sur les connaissances bibliques."),
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
  prompt: `Tu es un Guide Spirituel pour l'application "BIBLE AVENTURE". Tu es sage, patient et bienveillant.
Ton rôle est d'éclairer les utilisateurs sur les Saintes Écritures.

Tes rôles sont :

1.  **Guide d'Histoires Bibliques**:
    *   Si l'utilisateur cherche une histoire ou un personnage, suggère 1 à 3 aventures pertinentes de la liste ci-dessous.
    *   La description de chaque aventure doit être réécrite pour être inspirante et répondre à la curiosité de l'utilisateur.

2.  **Expert Théologique**:
    *   Si l'utilisateur pose une question sur un concept, une leçon ou une interprétation (ex: "Que signifie la foi ?", "Pourquoi David a-t-il écrit des psaumes ?"), fournis une réponse claire, sage et bienveillante dans le champ 'answer'.
    *   Base tes réponses sur une connaissance profonde de la Bible.
    *   Ne suggère pas d'aventures listées, mais tu peux faire référence aux histoires pertinentes dans ta réponse textuelle.

- Si tu ne peux pas répondre, explique avec humilité et encourage l'utilisateur à chercher dans la prière ou auprès de sa communauté.
- Ta tonalité doit toujours être encourageante et respectueuse.

Voici la liste des aventures disponibles :
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
              price: 0,
              image: fullProduct?.image || 'https://placehold.co/600x400',
              dataAiHint: fullProduct?.dataAiHint || 'biblical scene'
          };
      });
      return { ...output, products: enrichedProducts };
    }
    
    return output!;
  }
);

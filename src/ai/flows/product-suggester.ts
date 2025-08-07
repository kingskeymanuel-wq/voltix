'use server';

/**
 * @fileOverview An AI agent that suggests products based on user needs.
 * 
 * - suggestProducts - A function that takes a user query and returns product suggestions.
 * - ProductSuggesterInput - The input type for the suggestProducts function.
 * - ProductSuggesterOutput - The return type for the suggestProducts function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { allProducts } from '@/data/products';

const ProductSuggesterInputSchema = z.object({
  query: z.string().describe('The user\'s request describing what they are looking for.'),
});
export type ProductSuggesterInput = z.infer<typeof ProductSuggesterInputSchema>;

const ProductSuggesterOutputSchema = z.object({
  thought: z.string().describe("A brief thought process explaining why the following products were chosen."),
  products: z.array(
    z.object({
      id: z.string().describe('The product ID.'),
      name: z.string().describe('The name of the suggested product.'),
      description: z.string().describe('A short, compelling description of the product and why it fits the user\'s need.'),
      price: z.number().describe('The price of the product.'),
      image: z.string().describe('The image URL for the product.'),
      dataAiHint: z.string().describe('The AI hint for the product image.'),
    })
  ).describe('A list of recommended products for the user.'),
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
  prompt: `You are VOLTY, a friendly and expert AI assistant for VOLTIX SMART, a premium electronics store in Côte d'Ivoire.
  Your goal is to help users find the perfect product based on their needs.

  A user will describe what they are looking for. You must analyze their request and suggest 2 to 4 relevant products from the list below.

  Your response should start with a brief, friendly thought process explaining your choices. Then, provide the list of suggested products with their correct ID, name, price, and image URL. The description for each product should be rewritten to be compelling and directly address the user's query.

  Here is the list of available products:
  ${productContext}

  User's request:
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
    const enrichedProducts = output!.products.map(p => {
        const fullProduct = allProducts.find(item => item.id === p.id);
        return {
            ...p,
            price: fullProduct?.price || 0,
            image: fullProduct?.image || 'https://placehold.co/600x400',
            dataAiHint: fullProduct?.dataAiHint || 'electronic device'
        };
    });

    return { ...output!, products: enrichedProducts };
  }
);

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
      name: z.string().describe('The name of the product in the cart.'),
      category: z.string().describe('The category of the product.'),
      description: z.string().describe('A short description of the product.'),
    })
  ).describe('The items currently in the user\'s cart.'),
});
export type AccessoryRecommendationsInput = z.infer<typeof AccessoryRecommendationsInputSchema>;

const AccessoryRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      name: z.string().describe('The name of the recommended accessory.'),
      description: z.string().describe('A short description of the accessory.'),
    })
  ).describe('A list of recommended accessories for the products in the cart.'),
});
export type AccessoryRecommendationsOutput = z.infer<typeof AccessoryRecommendationsOutputSchema>;

export async function getAccessoryRecommendations(input: AccessoryRecommendationsInput): Promise<AccessoryRecommendationsOutput> {
  return accessoryRecommendationsFlow(input);
}

const accessoryRecommendationsPrompt = ai.definePrompt({
  name: 'accessoryRecommendationsPrompt',
  input: {schema: AccessoryRecommendationsInputSchema},
  output: {schema: AccessoryRecommendationsOutputSchema},
  prompt: `You are an AI assistant specializing in recommending accessories for electronic products.

  Given the products in the user's cart, suggest relevant accessories that would enhance their experience.

  The response must be a list of product names and descriptions.

  Products in cart:
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

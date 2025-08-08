'use server';

/**
 * @fileOverview Tools for the Genkit AI to interact with vendor data.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { mockClients, mockOrders, initialSavTickets } from '@/data/vendor';

export const findClientByName = ai.defineTool(
  {
    name: 'findClientByName',
    description: 'Finds a client by their full name.',
    inputSchema: z.object({
      name: z.string().describe('The full name of the client to find.'),
    }),
    outputSchema: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        totalSpent: z.number(),
        lastOrder: z.string(),
        status: z.string(),
    }).optional(),
  },
  async (input) => {
    const client = mockClients.find(
      (c) => c.name.toLowerCase() === input.name.toLowerCase()
    );
    return client;
  }
);

export const getClientOrders = ai.defineTool(
    {
        name: 'getClientOrders',
        description: "Retrieves all orders for a given client ID.",
        inputSchema: z.object({
            clientId: z.string().describe("The ID of the client (e.g., 'USR-001')."),
        }),
        outputSchema: z.array(z.object({
            id: z.string(),
            date: z.string(),
            total: z.number(),
            status: z.string(),
            items: z.array(z.object({
                name: z.string(),
                quantity: z.number(),
            }))
        })),
    },
    async (input) => {
        return mockOrders
            .filter(o => o.clientId === input.clientId)
            .map(o => ({
                id: o.id,
                date: o.date,
                total: o.total,
                status: o.status,
                items: o.items.map(i => ({ name: i.name, quantity: i.quantity })),
            }));
    }
);

export const getSavTickets = ai.defineTool(
    {
        name: 'getSavTickets',
        description: "Retrieves all after-sales service (SAV) tickets for a given client ID.",
        inputSchema: z.object({
            clientId: z.string().describe("The ID of the client (e.g., 'USR-001')."),
        }),
        outputSchema: z.array(z.object({
            id: z.string(),
            orderId: z.string(),
            product: z.string(),
            issue: z.string(),
            status: z.string(),
            date: z.string(),
        })),
    },
    async (input) => {
        return initialSavTickets.filter(t => t.clientId === input.clientId);
    }
);

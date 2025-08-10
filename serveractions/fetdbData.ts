'use server';

import { prisma } from '@/lib/prismaClient';

export async function fetchAllProducts() {
    try {
        const products = await prisma.product.findMany();
        return products;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        throw new Error("Error fetching product data");
    }
}

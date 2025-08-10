


"use server";

import { load } from 'cheerio';
import https from 'https';
import { prisma } from '@/lib/prismaClient';

const SCRAPINGANT_API_KEY = "5eb63611ae604ba482a013bccbea2ba0";

function extractPrice($: any): string | null {
    const selectors = [
        "#priceblock_ourprice",
        "#priceblock_dealprice",
        "#priceblock_saleprice",
        "#tp_price_block_total_price_ww",
        "#corePriceDisplay_desktop_feature_div .a-price .a-offscreen",
        ".a-price .a-offscreen"
    ];

    for (const selector of selectors) {
        const price = $(selector).first().text().trim();
        if (price) return price;
    }

    return null;
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export async function addProduct(asin: string): Promise<any> {
    const productUrl = `https://www.amazon.in/dp/${asin}`;
    const encodedUrl = encodeURIComponent(productUrl);

    const options = {
        method: "GET",
        hostname: "api.scrapingant.com",
        path: `/v2/general?url=${encodedUrl}&x-api-key=${SCRAPINGANT_API_KEY}`,
    };

    return new Promise(async (resolve) => {
        const request = https.request(options, (response) => {
            let data: Uint8Array[] = [];

            response.on("data", (chunk) => {
                data.push(chunk);
            });

            response.on("end", async () => {
                try {
                    const html = Buffer.concat(data).toString();
                    const $ = load(html);

                    const title = $("#productTitle").text().trim();
                    const priceString = extractPrice($);
                    const image = $("#imgTagWrapperId img").attr("src");

                    // Clean price
                    const price = priceString ? parseFloat(priceString.replace(/[₹,]/g, '')) : null;

                    if (!title || !price || !image) {
                        console.log({ title, price, image });
                        return resolve({ error: "Missing required product fields" });
                    }

                    // Check if product exists
                    const existingProduct = await prisma.product.findUnique({
                        where: { amazonId: asin },
                    });

                    if (existingProduct) {
                        // Compare for changes
                        const hasChanges =
                            existingProduct.title !== title ||
                            existingProduct.price !== price ||
                            existingProduct.img !== image;

                        if (hasChanges) {

                            let message = `Product updated: ${title}`;
                            if (existingProduct.price !== price) {
                                message += ` | Price: ₹${existingProduct.price} → ₹${price}`;
                            }

                            await prisma.notification.create({
                                data: { message }
                            });

                            console.log("Notification added");

                            // Count notifications
                            const total = await prisma.notification.count();

                            // If more than 5, delete the oldest ones
                            if (total > 5) {
                                const toDelete = await prisma.notification.findMany({
                                    orderBy: { time: "asc" }, // oldest first
                                    take: total - 2 // number to remove
                                });

                                const ids = toDelete.map(n => n.id);

                                await prisma.notification.deleteMany({
                                    where: { id: { in: ids } }
                                });

                                console.log(`Deleted ${ids.length} old notifications`);
                            }

                            // Update product
                            const updatedProduct = await prisma.product.update({
                                where: { amazonId: asin },
                                data: {
                                    title,
                                    price,
                                    img: image,
                                    updatedAt: new Date(),
                                },
                            });

                            // Log history
                            await prisma.productHistory.create({
                                data: {
                                    productId: existingProduct.id,
                                    title,
                                    price,
                                    img: image,
                                    changedAt: new Date(),
                                },
                            });

                            console.log("Product updated and history logged:", updatedProduct);
                            resolve(updatedProduct);
                        } else {
                            resolve({ message: "No changes detected" });
                        }
                    } else {
                        // Create new product
                        const saved = await prisma.product.create({
                            data: {
                                amazonId: asin,
                                title,
                                price,
                                img: image,
                                description: null,
                                reviews: undefined,
                            },
                        });

                        // Log initial history
                        await prisma.productHistory.create({
                            data: {
                                productId: saved.id,
                                title,
                                price,
                                img: image,
                                changedAt: new Date(),
                            },
                        });

                        console.log("Product saved and history logged:", saved);
                        resolve(saved);
                    }
                } catch (err) {
                    console.error("Parse error:", err);
                    resolve({ error: "Failed to parse or save product" });
                }
            });
        });

        request.on("error", (err) => {
            console.error("HTTPS Error:", err);
            resolve({ error: "Failed to fetch product" });
        });

        request.end();
    });
}


"use server";

import { load } from 'cheerio';
import https from 'https';


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
export async function Scrapper(asin: string): Promise<any> {
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



                    resolve(price);

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

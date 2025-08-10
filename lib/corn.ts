import cron from "node-cron";
import { addProduct } from "@/serveractions/productAction";
import { fetchAllProducts } from "@/serveractions/fetdbData";




let cronStarted = false;

export function startCron() {
    if (cronStarted) {
        console.log("Cron job already running, skipping scheduling...");
        return;
    }
    cronStarted = true;

    cron.schedule("*/30 * * * *", async () => {
        console.log("Running product update cron job...");

        const allProducts = await fetchAllProducts();
        console.log("Current products in DB:", allProducts);
        for (const product of allProducts) {
            try {
                const result = await addProduct(product.amazonId);
                console.log(`Processed ASIN ${product.amazonId}:`, result);
            } catch (error) {
                console.error(`Error processing ASIN ${product.amazonId}:`, error);
            }
        }
    });
    console.log("Cron job scheduled.");
}

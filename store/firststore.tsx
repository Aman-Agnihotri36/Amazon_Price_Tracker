import { fetchAllProducts } from '@/serveractions/fetdbData';
import { addProduct } from '@/serveractions/productAction';
import { create } from 'zustand';


type StoreState = {
    isLoading: boolean;
    callScraper: (id: string) => void;
    productData: any | null;
    callAllProductData: () => void;
};

// Define the store
export const useStore = create<StoreState>((set) => ({

    isLoading: false, // Initial state
    productData: null,
    callScraper: async (id: string) => {
        set({ isLoading: true });
        try {

            const data = await addProduct(id); // Example product ID

        } catch (error) {
            console.log("failed to scrape", error);
        } finally {
            set({ isLoading: false });

        }
    },

    callAllProductData: async () => {
        set({ isLoading: true });
        try {
            const data = await fetchAllProducts();
            set({ productData: data });
        } catch (error) {
            console.log("failed to fetch all products", error);
        } finally {
            set({ isLoading: false });
        }
    }
}));
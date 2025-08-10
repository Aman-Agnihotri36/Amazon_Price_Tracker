"use client";
import React, { useState } from 'react';
import { Button } from './ui/button';


import { useStore } from '@/store/firststore';
import Spinner from './Spinner';
import { useRouter } from 'next/navigation';


function AddProduct() {
    const [productId, setProductId] = useState('');


    let { isLoading, callScraper } = useStore();

    const router = useRouter();

    const handleAdd = async () => {
        if (productId) {
            await callScraper(productId);
            router.push('/?page=dashboard'); // Redirect to dashboard after adding product
        }
    };




    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            {
                isLoading ? (
                    <div className="flex items-center justify-center h-32">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        <input
                            type="text"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            placeholder="Enter Product ID"
                            className="border p-2 rounded w-full mb-4"
                        />
                        <Button onClick={handleAdd} disabled={!productId || isLoading} className="cursor-pointer w-full">
                            Add Product
                        </Button>
                    </>
                )}

        </div>
    );
}

export default AddProduct;
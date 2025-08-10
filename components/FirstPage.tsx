import React, { useEffect } from 'react'
import DashboardtopCard from './DashboardtopCard'
import DashboardProductCard from './DashboardProductCard'
import { useStore } from '@/store/firststore';
import Spinner from './Spinner';



function FirstPage() {
    const { productData, callAllProductData } = useStore();

    useEffect(() => {
        const fetchData = async () => {
            await callAllProductData(); // your async logic
        };

        fetchData();
    }, [callAllProductData]);
    console.log("productData", productData);
    return (
        <div>
            <div className='w-full grid grid-cols-3 gap-6 mb-6'>
                <DashboardtopCard title="Price" value="$29.99" />
                <DashboardtopCard title="Price" value="$29.99" />
                <DashboardtopCard title="Price" value="$29.99" />
            </div>
            <div className='grid grid-cols-3 gap-6'>

                {productData && productData.length > 0 ? (
                    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                    productData.map((product: any) => (
                        <DashboardProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="flex justify-center items-center w-full h-32 col-span-3">
                        <Spinner />
                    </div>
                )}


            </div>
        </div>
    )
}

export default FirstPage

import React from 'react'
import { Card } from './ui/card'
import Image from 'next/image'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function DashboardProductCard({ product }: { product: any }) {
    return (
        <Card className="p-4 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className='flex items-center gap-4'>
                <div className='w-24 h-24 flex-shrink-0'>
                    <Image
                        height={150}
                        width={150}
                        src={product.img || '/placeholder-image.png'}
                        alt="Amazon Echo Dot"
                        className="object-contain w-full h-full"
                    />
                </div>
                <div>
                    <h3 className='font-bold text-lg text-gray-900'>{product.title}</h3>
                    <h4 className='text-xl font-semibold text-green-600'>{product.price}</h4>
                    <h5 className='text-sm text-gray-500'>{product.timestamp}</h5>
                </div>
            </div>
        </Card>
    )
}

export default DashboardProductCard
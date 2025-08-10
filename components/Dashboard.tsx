"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'

import FirstPage from './FirstPage'
import AddProduct from './AddProduct'
import Notification from './Notification'


function Dashboard() {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || 'dashboard';








    return (
        <div className='col-span-9 p-4'>
            <h1 className='font-bold text-2xl text-gray-800 mb-6'>Dashboard</h1>
            {page === 'addproduct' ? <AddProduct /> : page === 'notification' ? <Notification /> : <FirstPage />}
        </div>
    )
}

export default Dashboard
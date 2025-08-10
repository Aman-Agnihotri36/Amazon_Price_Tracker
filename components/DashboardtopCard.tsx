import React from 'react'
import { Card } from './ui/card'
import LineChart from './LineChart'

function DashboardtopCard({
    title = 'Price',
    value = '$29.99'
}) {
    return (
        <Card className='p-4 shadow-md rounded-lg border border-gray-200 overflow-hidden'>
            <div className='flex flex-col h-48'>
                <div className='text-gray-600 text-sm font-medium mb-2'>{title}</div>
                <div className='text-2xl font-bold text-gray-800 mb-4'>{value}</div>
                <div className='flex-grow'>
                    <LineChart />
                </div>
            </div>
        </Card>
    )
}

export default DashboardtopCard
"use client"

import React from 'react'

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'





function LineChart({
    data = [
        { x: 'January', y: 186 },
        { x: 'February', y: 305 },
        { x: 'March', y: 237 },
        { x: 'April', y: 73 },
        { x: 'May', y: 209 },
        { x: 'June', y: 214 },
    ],

    label = 'Desktop',
    color = 'var(--chart-1)',
}: {
    data?: { x: string, y: number }[],
    label?: string,
    color?: string
}) {


    const chartConfig = {
        desktop: {
            label: label,
            color: color,
        }

    } satisfies ChartConfig

    return (
        <div className='w-full -mt-2 -mb-4'>



            <ChartContainer config={chartConfig}>
                <AreaChart

                    data={data}
                    margin={{
                        left: 12,
                        right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <defs>
                        <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor="var(--color-desktop)"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="var(--color-desktop)"
                                stopOpacity={0.1}
                            />
                        </linearGradient>
                        <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor="var(--color-mobile)"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="var(--color-mobile)"
                                stopOpacity={0.1}
                            />
                        </linearGradient>
                    </defs>

                    <Area
                        dataKey="desktop"
                        type="natural"
                        fill="url(#fillDesktop)"
                        fillOpacity={0.4}
                        stroke="var(--color-desktop)"
                        stackId="a"
                    />
                </AreaChart>
            </ChartContainer>



        </div>
    )
}

export default LineChart

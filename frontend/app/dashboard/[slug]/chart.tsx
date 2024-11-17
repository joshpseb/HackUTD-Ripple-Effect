import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Car } from './columns'

type Props = {
    chartData: Car[]
}

export default function Chart({ chartData }: Props) {
    // Transform the data to have MPG types as categories
    const transformedData = [
        {
            category: "City MPG",
            [chartData[0]?.model]: chartData[0]?.cityMpg,
            [chartData[1]?.model]: chartData[1]?.cityMpg,
        },
        {
            category: "Highway MPG",
            [chartData[0]?.model]: chartData[0]?.highwayMpg,
            [chartData[1]?.model]: chartData[1]?.highwayMpg,
        },
        {
            category: "Combined MPG",
            [chartData[0]?.model]: (chartData[0]?.cityMpg + chartData[0]?.highwayMpg) / 2,
            [chartData[1]?.model]: (chartData[1]?.cityMpg + chartData[1]?.highwayMpg) / 2,
        },
    ];

    // Dynamic chart config based on selected cars
    const chartConfig = {
        [chartData[0]?.model]: {
            label: chartData[0]?.model,
            color: "#2563eb", // Dark blue
        },
        [chartData[1]?.model]: {
            label: chartData[1]?.model,
            color: "#60a5fa", // Light blue
        },
    } satisfies ChartConfig;

    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={transformedData}>
                <XAxis
                    dataKey="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <CartesianGrid vertical={false} />
                {chartData[0] && (
                    <Bar
                        dataKey={chartData[0].model}
                        fill={`var(--color-${chartData[0].model})`}
                        radius={4}
                    />
                )}
                {chartData[1] && (
                    <Bar
                        dataKey={chartData[1].model}
                        fill={`var(--color-${chartData[1].model})`}
                        radius={4}
                    />
                )}
            </BarChart>
        </ChartContainer>
    );
}
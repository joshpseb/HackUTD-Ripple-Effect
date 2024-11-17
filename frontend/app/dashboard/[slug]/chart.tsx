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
    const sortedData = chartData.sort((a, b) => a.year - b.year);
    const transformedData = [
        {
            category: "City MPG",
            [sortedData[0]?.model]: sortedData[0]?.cityMpg,
            [sortedData[1]?.model]: sortedData[1]?.cityMpg,
        },
        {
            category: "Highway MPG",
            [sortedData[0]?.model]: sortedData[0]?.highwayMpg,
            [sortedData[1]?.model]: sortedData[1]?.highwayMpg,
        },
        {
            category: "Combined MPG",
            [sortedData[0]?.model]: (sortedData[0]?.cityMpg + sortedData[0]?.highwayMpg) / 2,
            [sortedData[1]?.model]: (sortedData[1]?.cityMpg + sortedData[1]?.highwayMpg) / 2,
        },
    ];

    const chartConfig = {
        [sortedData[0]?.model]: {
            label: sortedData[0]?.model,
            color: "#2563eb",
        },
        [sortedData[1]?.model]: {
            label: sortedData[1]?.model,
            color: "#60a5fa",
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
                {sortedData[0] && (
                    <Bar
                        dataKey={sortedData[0].model}
                        fill={`var(--color-${sortedData[0].model})`}
                        radius={4}
                    />
                )}
                {sortedData[1] && (
                    <Bar
                        dataKey={sortedData[1].model}
                        fill={`var(--color-${sortedData[1].model})`}
                        radius={4}
                    />
                )}
            </BarChart>
        </ChartContainer>
    );
}
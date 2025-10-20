
import { Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { ComponentProps, } from "react"

export type TPieChartData = {
    key: string,
    data: number;
    fill?: string;
}

type PieChartWrapperProps = {
    chartData: TPieChartData[],
} & ComponentProps<typeof PieChart>

export const PieChartWrapper = ({ chartData, ...props }: PieChartWrapperProps) => {
    return (
        <PieChart {...props}>
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend
                content={<ChartLegendContent nameKey="key" />}
                className="text-black fill-black -translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
            <Pie
                data={chartData}
                dataKey="data"
                nameKey="key"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={0}
                activeShape={({
                    outerRadius = 0,
                    ...props
                }: PieSectorDataItem) => (
                    <Sector {...props} outerRadius={outerRadius + 10} />
                )}
            />
        </PieChart>
    )
}

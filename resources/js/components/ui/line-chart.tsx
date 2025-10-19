import { ComponentProps } from "react"
import { ChartTooltip, ChartTooltipContent, type ChartConfig } from "./chart"
import { ChartContainer } from "./chart-container"
import { Line, LineChart, XAxis } from "recharts"

type LineChartProps<T> = {
    config: ChartConfig;
    chartData: T[];
} & ComponentProps<"div">
export const LineChartWrapper = <T,>({ config, chartData }: LineChartProps<T>) => {
    console.log(Object.keys(chartData[0] || {}))

    return (
        <ChartContainer config={config}>
            <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                    top: 12,
                    bottom: 12,
                    left: 12,
                    right: 12,
                }}
            >
                <XAxis
                    dataKey="x"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />


                <Line
                    dataKey="completed"
                    type="monotone"
                    strokeWidth={2}
                    stroke={`var(--color-completed)`}
                    dot={{
                        fill: "var(--color-desktop)",
                    }}
                    activeDot={{
                        r: 6,
                    }}
                />
            </LineChart>
        </ChartContainer>
    )
}

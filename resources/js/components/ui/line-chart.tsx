import { ComponentProps } from "react"
import { ChartTooltip, ChartTooltipContent, type ChartConfig } from "./chart"
import { ChartContainerWrapper } from "./chart-container"
import { Line, LineChart, XAxis } from "recharts"
import { cn } from "@/lib/utils"

type LineChartProps<T> = {
    config: ChartConfig;
    chartData: T[];
} & ComponentProps<typeof LineChart>

export const LineChartWrapper = <T,>({ config, margin, chartData, className }: LineChartProps<T>) => {
    return (
        <ChartContainerWrapper config={config} className={cn("w-full", className)}>
            <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                    top: 12,
                    bottom: 12,
                    left: 20,
                    right: 20,
                    ...margin
                }}
            >
                <XAxis
                    dataKey="x"
                    className="hidden lg:block"
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    tickMargin={8}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                />
                {
                    Object
                        .keys(chartData[0] || {})
                        .filter(key => key !== 'x')
                        .map(key => {
                            return (
                                <>
                                    <Line
                                        dataKey={key}
                                        type="monotone"
                                        strokeWidth={2}
                                        stroke={`var(--color-${key})`}
                                        dot={{
                                            fill: `var(--color-${key})`,
                                        }}
                                        activeDot={{
                                            r: 6,
                                        }}
                                    />
                                </>
                            )
                        })
                }
            </LineChart>
        </ChartContainerWrapper>
    )
}

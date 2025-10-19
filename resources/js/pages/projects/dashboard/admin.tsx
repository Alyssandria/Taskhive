import { fetchWithToken } from "@/lib/utils";
import { useEffect, useState } from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const chartConfig = {
    x: {
        label: "X",
        color: "#fff",
    },
    completed: {
        label: "Completed",
        color: "purple",
    },
} satisfies ChartConfig

const CompletedChart = () => {
    const [chartData, setChartData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchWithToken({
                url: '/api/stats/tasks',
            });
            setChartData(response.data);
        }
        fetchData();
    }, []);

    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
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
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="x"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />

                <Line
                    dataKey="completed"
                    type="monotone"
                    strokeWidth={2}
                    stroke="var(--color-completed)"
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

export const AdminDashboard = () => {
    return (
        <div>
            Hello From Admin Dashboard
            <Card>
                <CardHeader>
                    <CardTitle>Line Chart</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                    <CardAction>
                        Past
                        <Button>7D</Button>
                        <Button>1M</Button>
                        <Button>6M</Button>
                        <Button>1Y</Button>
                    </CardAction>
                </CardHeader>
                <CardContent className="relative">
                    <CompletedChart />
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 leading-none font-medium">
                    </div>
                    <div className="text-muted-foreground leading-none">
                        Showing total visitors for the last 6 months
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

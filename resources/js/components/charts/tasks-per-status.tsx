
import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { ChartContainerWrapper } from "../ui/chart-container"
import { ComponentProps, useEffect, useState } from "react"
import axios from "axios"
import { LoadingContainer } from "../loading-container"
import { PieChartWrapper, TPieChartData } from "../ui/pie-chart"

const chartConfig = {
    Pending: {
        label: "Pending",
        color: "var(--chart-1)",
    },
    Completed: {
        label: "Completed",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function TaskPerStatus() {
    const [chartData, setChartData] = useState<TPieChartData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await axios("/api/stats/tasks/status");

            const data = response.data as {
                count: number,
                status: string
            }[];

            const formatted = data.map(el => {
                return {
                    data: el.count,
                    key: el.status,
                    fill: `var(--color-${el.status})`
                }
            }) as TPieChartData[];

            setChartData(formatted);
            setIsLoading(false);
        }

        fetchData();

    }, [])
    return (
        <Card className="size-full flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Pie Chart - Donut Active</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="size-full flex items-center justify-center flex-1 pb-0">
                <LoadingContainer isLoading={isLoading} className="size-full min-h-[200px]">
                    <ChartContainerWrapper
                        config={chartConfig}
                        className="size-full mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChartWrapper chartData={chartData} className="size-full" />
                    </ChartContainerWrapper>
                </LoadingContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}

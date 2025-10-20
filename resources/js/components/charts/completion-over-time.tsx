import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { LineChartWrapper } from "../ui/line-chart";
import { type ChartConfig } from "../ui/chart";
import { cn } from "@/lib/utils";
import { LoadingContainer } from "../loading-container";


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

type ChartData = {
    x: string,
} & Record<string, any>;

type TOptions = "1W" | "1M" | "6M" | "1Y"

export const CompletionOverTime = () => {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [selectedTF, setSelectedTF] = useState<TOptions>("1W");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const options = [
        {
            label: "7D",
            value: "1W",
            callback: () => handleOptionClick("1W")
        },
        {
            label: "1M",
            value: "1M",
            callback: () => handleOptionClick("1M")
        },
        {
            label: "6M",
            value: "6M",
            callback: () => handleOptionClick("6M")
        },
        {
            label: "1Y",
            value: "1Y",
            callback: () => handleOptionClick("1Y")
        },
    ];

    const handleOptionClick = (option: TOptions) => {
        setSelectedTF(option);
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios({
                url: '/api/stats/tasks/completions',
            });

            setChartData(response.data);
        }
        fetchData();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Line Chart</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
                <CardAction className="flex items-center gap-2">
                    <span className="text-muted-foreground">Completions over the past</span>
                    <div className="flex gap-2 border p-1 rounded-sm bg-gray-100">
                        {options.map((option) => {
                            const isSelected = selectedTF === option.value;
                            return (
                                <Button
                                    key={option.value}
                                    disabled={isSelected}
                                    onClick={option.callback}
                                    className={cn(
                                        "p-2 bg-transparent text-black hover:text-white",
                                        isSelected ?
                                            "bg-black disabled:cursor-not-allowed disabled:opacity-70 text-white hover:cursor-not-allowed"
                                            : ""
                                    )}
                                >{option.label}</Button>
                            )
                        })}
                    </div>
                </CardAction>
            </CardHeader>
            <CardContent className="relative ">
                <LoadingContainer isLoading={isLoading} className="min-h-[200px]">
                    <LineChartWrapper
                        config={chartConfig}
                        chartData={chartData}
                    />
                </LoadingContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}

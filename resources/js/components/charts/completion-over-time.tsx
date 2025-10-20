import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { LineChartWrapper } from "../ui/line-chart";
import { type ChartConfig } from "../ui/chart";
import { cn } from "@/lib/utils";
import { LoadingContainer } from "../loading-container";
import { router } from "@inertiajs/react";


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

    const fetchData = async (option: TOptions) => {
        router.get(`/api/stats/tasks/status`);
        // setIsLoading(true);
        // const response = await axios({
        //     url: `/api/stats/tasks/completions?range=${option}`,
        // });
        //
        // setChartData(response.data);
        // setIsLoading(false);
    }

    const marginLookup: Record<TOptions, number> = {
        "1W": 20,
        "1M": 50,
        "6M": 65,
        "1Y": 65,
    }

    const options: {
        label: string;
        value: TOptions;
    }[] = [
            {
                label: "7D",
                value: "1W",
            },
            {
                label: "1M",
                value: "1M",
            },
            {
                label: "6M",
                value: "6M",
            },
            {
                label: "1Y",
                value: "1Y",
            },
        ];

    const handleOptionClick = (option: TOptions) => {
        setSelectedTF(option);
        fetchData(option);
    }

    useEffect(() => {
        fetchData(selectedTF);
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
                                    onClick={() => handleOptionClick(option.value)}
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
                        margin={{
                            left: marginLookup[selectedTF],
                            right: marginLookup[selectedTF]
                        }
                        }
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

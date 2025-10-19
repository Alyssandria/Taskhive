import { ComponentProps } from "react"
import { ChartConfig } from "./chart"
import { cn } from "@/lib/utils"

type ChartContainerProps = {
    config: ChartConfig,
} & ComponentProps<"div">

export const ChartContainer = ({ config, children, className, ...props }: ChartContainerProps) => {
    return (
        <ChartContainer config={config} className={cn("min-h-[200px] w-full", className)} {...props}>
        </ChartContainer>
    )
}

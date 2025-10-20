import { ComponentProps } from "react"
import { ChartConfig, ChartContainer } from "./chart"
import { cn } from "@/lib/utils"

type ChartContainerProps = {
    config: ChartConfig,
} & ComponentProps<typeof ChartContainer>

export const ChartContainerWrapper = ({ config, children, className, ...props }: ChartContainerProps) => {
    return (
        <ChartContainer config={config} className={cn("min-h-[200px] w-full", className)} {...props}>
            {children}
        </ChartContainer>
    )
}

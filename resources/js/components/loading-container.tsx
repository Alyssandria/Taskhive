import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"
import { ComponentProps } from "react"

type LoadingContainerProps = {
    isLoading: boolean,
} & ComponentProps<"div">
export const LoadingContainer = ({ className, children, isLoading }: LoadingContainerProps) => {
    return (
        <div className={cn("size-full", isLoading ?
            "flex items-center justify-center" : "",
            className
        )}>{
                isLoading ?
                    <Loader2Icon className="size-6 animate-spin" /> :
                    children
            }</div>
    )
}

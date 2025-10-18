import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef } from "react"

export const DashboardCard = ({ children, className, ...props }: ComponentPropsWithoutRef<"div">) => {
    return (
        <div className={cn("rounded-lg p-5 bg-white", className)}  {...props}>
            {children}
        </div>
    )
}

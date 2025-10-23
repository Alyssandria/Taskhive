import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

const DashboardRowItem = ({ children, className, ...props }: ComponentProps<"div">) => {
    return (
        <div className={cn("flex flex-col w-20", className)} {...props}>
            {children}
        </div>
    )
}

const DashboardRowLabel = ({ children, className, ...props }: ComponentProps<"span">) => {
    return (
        <span className={cn("block text-sm text-muted-foreground truncate", className)} {...props}>{children}</span>
    )
}

const DashboardRowContent = ({ children, className, ...props }: ComponentProps<"span">) => {
    return (
        <span className={cn("block text-lg font-bold truncate", className)} {...props}>{children}</span>
    )
}


export const DashboardRow = ({ children, className, ...props }: ComponentProps<"div">) => {
    return (
        <div className={cn("flex justify-between items-center p-3 gap-6 px-8 rounded-lg", className)} {...props}>
            {children}
        </div>
    )
}

DashboardRow.item = DashboardRowItem;
DashboardRow.label = DashboardRowLabel;
DashboardRow.content = DashboardRowContent;

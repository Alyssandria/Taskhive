import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

type DashboardSectionProps = {
    title: string;
} & ComponentPropsWithoutRef<"section">

export const DashboardSection = ({ title, children, className, ...props }: DashboardSectionProps) => {
    return (
        <section className={cn("flex flex-col gap-4", className)} {...props}>
            <h2 className="text-2xl font-bold">{title}</h2>
            {children}
        </section>
    )
}

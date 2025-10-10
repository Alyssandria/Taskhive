import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export const LogoIcon = ({ className, ...props }: ComponentProps<"svg">) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
        className={cn("size-12", className)}
        fill="none"
        {...props}
    >
        <g clipPath="url(#a)">
            <path
                fill="#306BFF"
                d="M33.724 36.58A21.429 21.429 0 0 0 3.419 6.277l7.072 7.071c1.115 1.116 2.917 1.06 4.337.371a8.57 8.57 0 0 1 11.454 11.455c-.69 1.42-.745 3.221.37 4.337l7.072 7.07Z"
            />
            <path
                fill="#1E293B"
                d="M30 40H19.51a5.714 5.714 0 0 1-4.04-1.674L1.673 24.531A5.714 5.714 0 0 1 0 20.49V10l30 30ZM10.714 40H4.286A4.286 4.286 0 0 1 0 35.714v-6.428L10.714 40Z"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h40v40H0z" />
            </clipPath>
        </defs>
    </svg>
)

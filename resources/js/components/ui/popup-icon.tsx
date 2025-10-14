import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

export const PopupIcon = ({className, ...props} : ComponentProps<"svg">) => (
    <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 80 65"
  className={cn("size-full", className)}
  fill="none"
  {...props}
>
  <g filter="url(#a)">
    <circle cx={25} cy={19} r={8} fill="#FFB580" />
    <circle cx={25} cy={49} r={8} fill="#BB80FF" />
    <circle cx={55} cy={19} r={8} fill="#306BFF" />
    <circle cx={55} cy={49} r={8} fill="#78C552" />
  </g>
  <defs>
    <filter
      id="a"
      width={84}
      height={84}
      x={0}
      y={0}
      colorInterpolationFilters="sRGB"
      filterUnits="userSpaceOnUse"
    >
      <feFlood floodOpacity={0} result="BackgroundImageFix" />
      <feColorMatrix
        in="SourceAlpha"
        result="hardAlpha"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
      />
      <feOffset dx={-8} dy={8} />
      <feGaussianBlur stdDeviation={9} />
      <feComposite in2="hardAlpha" operator="out" />
      <feColorMatrix values="0 0 0 0 0.580392 0 0 0 0 0.639216 0 0 0 0 0.721569 0 0 0 0.12 0" />
      <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_902_949" />
      <feBlend
        in="SourceGraphic"
        in2="effect1_dropShadow_902_949"
        result="shape"
      />
    </filter>
  </defs>
</svg>

)
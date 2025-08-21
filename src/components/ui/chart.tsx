"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
  content?: React.ReactElement;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("w-full", className)} {...props} />
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = ({ active, payload, label, content }: ChartTooltipProps) => {
  if (content) {
    return content;
  }
  
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
            {payload.map((entry, index: number) => (
              <span key={index} className="font-bold" style={{ color: entry.color }}>
                {entry.name}: {entry.value}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return null
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn(className)} {...props} />
})
ChartTooltipContent.displayName = "ChartTooltipContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent }

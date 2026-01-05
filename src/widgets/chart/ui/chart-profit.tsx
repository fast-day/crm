import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/ui"
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/card/ui/card"

export const description = "An interactive area chart"


const chartData = [
  { date: "05-01-2025 13:00", profit: 97, },
  { date: "05-01-2025 14:00", profit: 222, },
  { date: "05-01-2025 15:00", profit: 167, },
  { date: "05-01-2025 16:00", profit: 0, },
  { date: "05-01-2025 18:00", profit: 0, },
  { date: "05-01-2025 19:00", profit: 301, },
  { date: "05-01-2025 20:00", profit: 245, },
  { date: "05-01-2025 21:00", profit: 409, },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  profit: {
    label: "profit",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export const ChartProfit = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Статистика</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-105 w-full"
        >
          <AreaChart data={chartData} accessibilityLayer={false}>
            <defs>
              <linearGradient id="fill-profit" x1="0" y1="0" x2="0" y2="1">
                {/* <stop
                  offset="10%"
                  stopColor="var(--color-profit)"
                  stopOpacity={0.1}
                /> */}
                <stop
                  offset="95%"
                  stopColor="var(--color-profit)"
                  stopOpacity={0.2}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false}/>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("ru-RU", { month: "short", day: "numeric" })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => { return new Date(value).toLocaleDateString("ru-RU", { month: "short", day: "numeric", year: "numeric", }) }}
                />
              }
            />
            <Area
              dataKey={"profit"}
              type={"bump"}
              fill={"url(#fill-profit)"}
              stroke={"var(--color-profit)"}
              strokeWidth={2}
              className={"var(--color-profit)"}
              stackId={"a"}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

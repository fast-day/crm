import { Card } from "@/shared/ui"
import { ChartProfit } from "@/widgets/chart"

export const Dashboard = () => {
  return (
    <div className="flex gap-8">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <Card className="h-23 w-full" />
          <Card className="h-23 w-full" />
        </div>
        <div className="mt-8">
          <ChartProfit />
        </div>
      </div>
      <div className="max-w-120 w-full bg-card/60 rounded-3xl h-full"></div>
    </div>
  )
}

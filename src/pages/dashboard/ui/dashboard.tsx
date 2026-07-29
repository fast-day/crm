// import { useAccount } from "@/entities/account"
// import { useGetChartQuery } from "@/entities/dashboard"
// import { ChartProfit } from "@/widgets/chart"
// import { DashboardStatisticsNum } from "@/widgets/dashboard"
// import { useSelector } from "react-redux"

import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react"

export const Dashboard = () => {
  // const { location, account } = useSelector(useAccount);

  // const { data: chart, isLoading, isFetching } = useGetChartQuery({ location_id: location?.id });

  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/bookings?limit=20&sort=newest&status=new", replace: true });
  }, [navigate]);

  return (
    <div className="flex flex-col gap-8">
      
      {/* <DashboardStatisticsNum location_id={location?.id} currency={account!.company!.currency ?? "RUB"} /> */}
      
      {/* <ChartProfit data={chart} isLoading={isLoading} isFetching={isFetching} /> */}
    </div>
  )
}

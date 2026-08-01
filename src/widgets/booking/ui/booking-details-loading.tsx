import { Card, CardContent, CardHeader, Skeleton } from "@/shared/ui"
import { ContentPanel } from "@/widgets/ content-panel"

export const BookingDetailsLoading = () => {
  return (
    <div className="mt-8 h-full flex">
      <div className="flex flex-col w-full space-y-8 container">
        <Card>
          <CardHeader className="pb-0">
            <Skeleton className="w-34 h-6 rounded-8" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-20"/>
            <Skeleton className="h-20"/>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-0 flex items-center flex-row gap-4">
            <Skeleton className="w-24 h-24" />
            <div className="space-y-1">
              <Skeleton className="w-30 h-6 rounded-8"/>
              <Skeleton className="w-20 h-5 rounded-8"/>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-18"/>
            <Skeleton className="w-50 h-18"/>
          </CardContent>
        </Card>
      </div>

      <ContentPanel
        actionClassName="mt-auto"
        content={
          <div className="space-y-2.5">
            <Skeleton className="h-18"/>
            <Skeleton className="h-45"/>
            <Skeleton className="h-18"/>
          </div>
        }
      />
    </div>
  )
}

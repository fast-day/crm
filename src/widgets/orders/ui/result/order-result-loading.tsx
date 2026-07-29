import { Card, CardContent, Skeleton } from "@/shared/ui"

export const OrderResultLoading = () => {
  return (
    <Card className="max-w-135 w-full mx-auto">
      <CardContent className="space-y-8">
        
        <div className="flex items-center flex-col justify-center gap-6">
          <Skeleton className="w-30 h-30 rounded-full" />
          
          <div className="flex flex-col items-center space-y-2.5">
            <Skeleton className="w-45 h-8" />
            <Skeleton className="w-50 h-4" />
            <Skeleton  className="w-22 h-5"/>
          </div>
        </div>

        <div className="space-y-6">

          <div>

            <div className="grid grid-cols-[48px_1fr_140px] space-y-2 items-center">
              <Skeleton className="w-5 h-5 rounded-8" />
              <Skeleton className="w-30 h-5 rounded-8" />
              <Skeleton className="w-20 h-5 ml-auto rounded-8" />
            </div>

            <Skeleton className="w-full h-11 rounded-12 my-2.5" />
            <Skeleton className="w-full h-11 rounded-12 my-2.5" />
            <Skeleton className="w-full h-11 rounded-12 my-2.5" />

          </div>

          <div className="border-b border-border rounded-full" />

          <div className="flex items-center justify-between">
            <Skeleton className="w-30 h-6 rounded-8" />
            <Skeleton className="w-22 h-6 rounded-8" />
          </div>

        </div>

      </CardContent>
    </Card>
  )
}

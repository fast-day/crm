import { Card, Skeleton } from "@/shared/ui"
import { ContentLayout } from "@/widgets/layout"

export const OrderCheckoutLoading = () => {
  return (
    <div className="mt-8 flex h-full gap-8 1100:flex-row flex-col">
      <ContentLayout className="max-w-full md:space-y-8 space-y-6">
        <div className="space-y-4">
          <Skeleton className="w-35 h-6.5 rounded-lg" />
          <div className="flex sm:grid grid-cols-3 gap-2.5 md:gap-5">
            <Skeleton className="w-full h-11.5 lg:h-17 rounded-3xl" />
            <Skeleton className="w-full h-11.5 lg:h-17 rounded-3xl" />
            <Skeleton className="w-full h-11.5 lg:h-17 rounded-3xl" />
          </div>
        </div>
      </ContentLayout>

      <Card className="flex flex-col p-6 max-w-135 w-full mx-auto 1100:max-w-95 1100:min-w-95 1100:mx-0 space-y-6">

        <Skeleton className="w-full h-19" />


        <div className="flex-1 justify-end flex flex-col py-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
                <Skeleton className="w-25 h-8 rounded-lg" />
                <Skeleton className="w-6 h-6 rounded-lg" />
            </div>
            <Skeleton className="w-full h-32 rounded-2xl" />
          </div>
          <div className="py-8 flex items-center justify-between border-b border-border">
            <Skeleton className="w-12 h-6 rounded-lg" />
            <Skeleton className="w-30 h-6 rounded-lg" />
          </div>
          <div className="flex 420:flex-row flex-col gap-3 mt-6">
            <Skeleton className="w-full h-15 rounded-xl" />
            <Skeleton className="w-full h-15 rounded-xl" />
          </div>
        </div>
      </Card>
    </div>
  )
}

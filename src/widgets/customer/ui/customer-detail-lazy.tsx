import { Skeleton } from "@/shared/ui"
import { PageDetailWrapper } from "@/widgets/layout"

export const CustomerDetailLazy = () => {
  return (
    <PageDetailWrapper>
      <div className="col-span-3 space-y-8">
        <Skeleton className="h-57" />
        <Skeleton className="h-85" />
      </div>
      
      <div className="space-y-5 col-span-2">
        <Skeleton className="h-32"/>
      </div>
    </PageDetailWrapper>
  )
}

import { Skeleton } from "@/shared/ui"
import { PageDetailWrapper } from "@/widgets/layout"

export const ServiceDetailLazy = () => {
  return (
    <PageDetailWrapper>
      <div className="col-span-3 space-y-8">
        <Skeleton className="h-57" />
        <Skeleton className="h-51.25" />
      </div>
    </PageDetailWrapper>
  )
}

import { Skeleton } from "@/shared/ui"

export const LocationDetailLazy = () => {
  return (
    <div className="mt-8 grid grid-cols-5 gap-8 w-full">
      <Skeleton className="col-span-3 h-109" />
      <div className="space-y-5 col-span-2">
        <Skeleton className="h-32"/>
        <Skeleton className="h-32"/>
      </div>
    </div>
  )
}

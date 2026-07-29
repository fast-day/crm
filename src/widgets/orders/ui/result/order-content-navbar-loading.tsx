import { Card, CardHeader, CardTitle, Skeleton } from "@/shared/ui"

export const OrderContentNavbarLoading = () => {
  return (
    <Card className="flex flex-col px-4">

      <CardHeader className="px-0">
        <CardTitle>Содержание</CardTitle>
      </CardHeader>

        <Skeleton className="w-full h-19" />

      <div className="flex-1 justify-end flex flex-col px-0 py-6">

        <div className="space-y-4">
          <Skeleton className="w-full h-15 rounded-xl" />
          <Skeleton className="w-full h-15 rounded-xl" />
        </div>
      </div>
    </Card>
  )
}

import { Spinner } from "@/shared/ui"

export const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-center">
        <span className="mx-2">Загрузка</span>
        <Spinner className="size-6 text-primary" />
      </div>
    </div>
  )
}

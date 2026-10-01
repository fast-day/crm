import { Spinner } from "@/shared/ui"

interface ILoadingProps {
  msg?: string;
}

export const Loading = ({ msg="Загрузка" }: ILoadingProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-center">
        <span className="mx-2">{msg}</span>
        <Spinner className="size-6 text-primary" />
      </div>
    </div>
  )
}

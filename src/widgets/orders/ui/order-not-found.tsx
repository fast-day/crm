import Cast from "@/shared/icons/Cast";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui"

export const OrderNotFound = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <Cast />
        </EmptyMedia>
        <EmptyTitle>Платеж не найден</EmptyTitle>
        <EmptyDescription>
          Платеж, который вы ищете, не существует или был удален.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

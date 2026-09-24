import Cast from "@/shared/icons/Cast";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui"

export const TransactionNotFound = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <Cast />
        </EmptyMedia>
        <EmptyTitle>Транзакция не найдена</EmptyTitle>
        <EmptyDescription>
          Транзакция, которую вы ищете, не существует или была удалена.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

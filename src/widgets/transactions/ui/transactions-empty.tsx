import Cast from "@/shared/icons/Cast"
import { Empty } from "@/shared/ui"
import { EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui/empty/ui/empty"

export const TransactionsEmpty = () => {
  return (
    <Empty className="flex-1 h-full">
      <EmptyHeader>
        <EmptyMedia variant={"empty"}>
          <Cast />
        </EmptyMedia>
        <EmptyTitle>Транзакций пока нет</EmptyTitle>
        <EmptyDescription>Здесь появятся записи о ваших транзакциях</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

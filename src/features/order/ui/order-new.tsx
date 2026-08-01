import { NewOrderIcon } from "@/shared/icons"
import { Button } from "@/shared/ui"

export const OrderNew = () => {
  return (
    <Button
      type={"button"}
      size={"size_60"}
      className={"p-5"}
      isLoading={false}
      disabled={false}
      animation={"toggle_sm"}
      iconLeft={<NewOrderIcon width={20} height={20} />}
    >Новый платеж</Button>
  )
}

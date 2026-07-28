import { CancelOrderIcon } from "@/shared/icons"
import { Button } from "@/shared/ui"

interface IOrderCancelProps {
  order_id: string;
}

export const OrderCancel = ({ order_id }: IOrderCancelProps) => {

  const handleCancel = () => {
    console.log(order_id);
  }

  return (
    <Button
      type={"button"}
      size={"size_60"}
      variant={"red"}
      className={"p-5"}
      isLoading={false}
      disabled={false}
      onClick={handleCancel}
      iconLeft={<CancelOrderIcon width={20} height={20} />}
    >Отменить заказ</Button>
  )
}

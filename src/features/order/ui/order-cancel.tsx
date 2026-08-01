import { useDialog } from "@/entities/dialog";
import { useCancelOrderMutation } from "@/entities/orders";
import { CancelOrderIcon } from "@/shared/icons"
import { Button } from "@/shared/ui"
import { getErrorMessage } from "@/shared/utils";
import { toast } from "sonner";

interface IOrderCancelProps {
  order_id: string;
}

export const OrderCancel = ({ order_id }: IOrderCancelProps) => {
  const { openConfirmDialog } = useDialog();

  const [cancel, { isLoading }] = useCancelOrderMutation();

  const handleCancel = async () => {
    const confirm = await openConfirmDialog({
      title: "Отменить заказ",
      description: "Это действие отменит заказ, и его нельзя будет восстановить. Вы уверены, что хотите продолжить?"
    });

    if (!confirm) return;

    try {
      const res = await cancel({ order_id }).unwrap();
      console.log(res);
    }
    catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <Button
      type={"button"}
      size={"size_60"}
      variant={"red"}
      className={"p-5"}
      isLoading={isLoading}
      disabled={isLoading}
      onClick={handleCancel}
      animation={"toggle_sm"}
      iconLeft={<CancelOrderIcon width={20} height={20} />}
    >Отменить заказ</Button>
  )
}

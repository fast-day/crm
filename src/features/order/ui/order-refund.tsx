import { useDialog } from "@/entities/dialog";
import { useRefundOrderMutation } from "@/entities/orders";
import { ArrowBackIcon } from "@/shared/icons"
import { Button } from "@/shared/ui"
import { getErrorMessage } from "@/shared/utils";
import { toast } from "sonner";

interface IOrderRefundProps {
  order_id: string;
}

export const OrderRefund = ({ order_id }: IOrderRefundProps) => {
  const { openConfirmDialog } = useDialog();
  const [refund, { isLoading }] = useRefundOrderMutation();

  const handleRefund = async () => {
    const confirm = await openConfirmDialog({
      title: "Оформить возврат?",
      description: "Возврат этого заказа отменит транзакцию и создаст аннулированный счёт. Вы уверены, что хотите продолжить?"
    });

    if (!confirm) return;

    try {
      await refund({ order_id }).unwrap();
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
      onClick={handleRefund}
      animation={"toggle_sm"}
      iconLeft={<ArrowBackIcon width={20} height={20} />}
    >Возврат</Button>
  )
}

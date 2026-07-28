import { PAYMENT_METHODS_ENUM } from "@/shared/constants/payment-methods.constant"
import { TrashIcon } from "@/shared/icons";
import { Button } from "@/shared/ui";
import { formatPrice } from "@/shared/utils";

interface IOrderPaymentResultProps {
  payment: PaymentMethodType;
  subtotal: number;
  cancel: () => void;
}

export const OrderPaymentResult = ({ payment, subtotal, cancel }: IOrderPaymentResultProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Оплата</h3>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <div className="font-medium">{PAYMENT_METHODS_ENUM[payment].label}</div>
        </div>
        <div className="font-medium">{formatPrice(subtotal)} ₽</div>

        <Button
          variant={"transparent"}
          size={"size_24"}
          className={"font-medium text-red"}
          iconLeft={<TrashIcon width={20} height={20} />}
          onClick={cancel}
        >Удалить</Button>
      </div>
    </div>
  )
}

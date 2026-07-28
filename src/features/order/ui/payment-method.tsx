import { PAYMENT_METHODS_ENUM } from "@/shared/constants/payment-methods.constant"
import { Card, CardContent, CardTitle } from "@/shared/ui"
import { cn } from "@/shared/utils"

interface IPaymentMethodCardProps {
  isSelected: boolean;
  method: PaymentMethodType;
  onClick: (m: PaymentMethodType) => void;
}

export const PaymentMethodCard = ({ method, onClick, isSelected }: IPaymentMethodCardProps) => {
  return (
    <Card onClick={() => onClick(method)} className={cn("border-2 border-transparent cursor-pointer", isSelected ? "border-primary" : "")}>
      <CardContent className="p-5">
        <CardTitle className="text-xl">{PAYMENT_METHODS_ENUM[method].label}</CardTitle>
      </CardContent>
    </Card>
  )
}

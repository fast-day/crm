import { PaymentMethodCard } from "@/features/order"

interface IOrderSelectPaymentMethodProps {
  current_method: PaymentMethodType | null;
  selectPayment: (m: PaymentMethodType) => void;
}

const PAYMENT_METHODS = ["cash", "online", "credit_card"] as PaymentMethodType[]; 

export const OrderSelectPaymentMethod = ({ current_method, selectPayment }: IOrderSelectPaymentMethodProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Способ оплаты</h2>
      <div className="grid grid-cols-3 gap-5">
        {PAYMENT_METHODS.map((method, idx) => (
          <PaymentMethodCard
            key={idx}
            method={method}
            onClick={selectPayment}
            isSelected={method === current_method}
          />
        ))}
      </div>
    </div>
  )
}

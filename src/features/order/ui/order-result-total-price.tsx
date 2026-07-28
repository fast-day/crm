import { formatPrice } from "@/shared/utils"

interface IOrderResultTotalPriceProps {
  subtotal: number;
}

export const OrderResultTotalPrice = ({ subtotal }: IOrderResultTotalPriceProps) => {
  return (
    <div className="flex items-center justify-between gap-2.5">
      <p className="font-medium opacity-50">Итоговая цена</p>
      <p className="font-bold">{formatPrice(subtotal)} ₽</p>
    </div>
  )
}

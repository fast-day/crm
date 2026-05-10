import { formatPrice } from "@/shared/utils";
import { useMemo } from "react";

interface BookingTotalPriceProps {
  price: number;
}

export const BookingTotalPrice = ({ price }: BookingTotalPriceProps) => {
  const totalPrice = useMemo(() => formatPrice(price), [price]);

  return <div className="font-semibold">{totalPrice} ₽</div>
}

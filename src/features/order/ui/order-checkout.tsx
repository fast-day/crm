import { ChevronIcon } from "@/shared/icons"
import { Button } from "@/shared/ui"
import { Link } from "@tanstack/react-router";

interface IOrderCheckoutProps {
  booking_id: string;
  order_id: string;
}

export const OrderCheckout = ({ booking_id, order_id }: IOrderCheckoutProps) => {
  return (
    <Link to={`/orders/checkout/sell?booking_id=${booking_id}&order_id=${order_id}`} className="block">
      <Button
        size={"size_60"}
        className={"w-full"}
        type={"button"}
        isLoading={false}
        disabled={false}
        animation={"toggle_sm"}
        iconRight={<ChevronIcon width={20} height={20} />}
      >Продолжить</Button>
    </Link>
  )
}

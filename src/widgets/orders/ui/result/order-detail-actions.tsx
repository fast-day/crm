import { OrderBookingView, OrderCancel, OrderCheckout } from "@/features/order";

interface IOrderDetailActionsProps {
  status: OrderStatusType;
  booking_id: string;
  order_id: string;
}

export const OrderDetailActions = ({ status, booking_id, order_id }: IOrderDetailActionsProps) => {
  return (
    <div className="space-y-4">
      {/* {(status === "paid" || status === "refund") && <OrderNew />} */}
      {(status === "unpaid") && <OrderCheckout booking_id={booking_id} order_id={order_id} />}
      <OrderBookingView booking_id={booking_id} />
      {(status === "unpaid") && <OrderCancel order_id={order_id} />}
    </div>
  )
}

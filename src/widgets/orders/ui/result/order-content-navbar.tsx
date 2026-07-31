import type { CustomerProfile } from "@/entities/customers";
import type { IOrderDetail } from "@/entities/orders";
import { Avatar } from "@/entities/user"
import { OrderBookingView, OrderCheckout, OrderNew, OrderCancel } from "@/features/order";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui"
import { Link } from "@tanstack/react-router"

interface OrderContentNavbarProps extends IOrderDetail {
  customer: Omit<CustomerProfile, "birthday">;
}

export const OrderContentNavbar = ({ customer, status, id: order_id, bookings }: OrderContentNavbarProps) => {
  return (
    <Card className="flex flex-col px-4">

      <CardHeader className="px-0">
        <CardTitle>Содержание</CardTitle>
      </CardHeader>

      <Card>
        <CardHeader className="p-0">
          <Link to={`/customers/${customer.id}`} className="flex flex-row items-center gap-2.5 p-4">
            <div className="relative">
              <Avatar size={"large"} id={customer.id} name={customer.full_name} avatar_url={customer.avatar} />
            </div>
            <div>
              <CardTitle className="capitalize text-base">{customer.full_name}</CardTitle>
              <CardDescription className="opacity-50 mt-0 leading-3 text-xss">{customer.phone}</CardDescription>
            </div>
          </Link>
        </CardHeader>
      </Card>

      <CardContent className="flex-1 justify-end flex flex-col px-0">

        <div className="space-y-4">

          {(status === "paid" || status === "cancelled") && <OrderNew />}
          {(status === "unpaid" || status === "cancelled") && <OrderCheckout booking_id={bookings[0].id} order_id={order_id} />}
          <OrderBookingView booking_id={bookings[0].id} />
          {(status === "unpaid") && <OrderCancel order_id={order_id} />}

        </div>
      </CardContent>
    </Card>
  )
}

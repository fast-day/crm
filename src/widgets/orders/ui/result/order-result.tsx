import type { IOrderDetail } from "@/entities/orders"
import { Card, CardContent } from "@/shared/ui"
import { OrderResultServices } from "./order-result-services"
import { OrderResultTotalPrice } from "@/features/order"
import { OrderResultHead } from "./order-result-head"


export const OrderResult = ({ bookings, date, time, subtotal, status }: IOrderDetail) => {
  return (
    <Card className="max-w-135 w-full mx-auto">
      <CardContent className="space-y-8">
        
        <OrderResultHead status={status} date={date} time={time} />

        <div className="space-y-6">

          <OrderResultServices bookings={bookings} />

          <div className="border-b border-border rounded-full" />
          <OrderResultTotalPrice subtotal={subtotal} />

        </div>

      </CardContent>
    </Card>
  )
}

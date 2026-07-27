import { BookingServiceCard, type IBookingDetail } from "@/entities/booking"
import type { IOrderDetail } from "@/entities/orders";
import { OrderSelectPaymentMethod } from "./order-select-payment-method";
import { useState } from "react";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui";
import { Link } from "@tanstack/react-router";
import { Avatar } from "@/entities/user";
import { formatPrice } from "@/shared/utils";
import { OrderPaymentResult } from "./order-payment-result";

interface IOrderCheckoutSellProps {
  booking: IBookingDetail;
  order?: IOrderDetail;
}

export const OrderCheckoutSell = ({ booking, order }: IOrderCheckoutSellProps) => {
  const [payment, setPayment] = useState<PaymentMethodType | null>(null);

  const selectPayment = (method: PaymentMethodType) => {
    setPayment(method);
  }

  return (
    <div className="mt-8 h-full">
      <div className="grid grid-cols-3 gap-8 h-full">

        <div className="col-span-2 space-y-8">

          <OrderSelectPaymentMethod current_method={payment} selectPayment={selectPayment} />
          {payment && (
            <OrderPaymentResult
              payment={"online"}
              subtotal={booking.order ? booking.order.subtotal : booking.booking_services.reduce((sum, s) => sum + s.booking_service_price, 0)}
              cancel={() => setPayment(null)}
            />
          )
          }
        </div>

        <Card className="flex flex-col">

          <Card className="bg-transparent">
            <CardHeader className="p-0">
              <Link to={`/customers/${booking.customer.customer_attributes.profile_id}`} className="flex flex-row items-center gap-2.5 p-5 hover:bg-card rounded-t-3xl duration-200">
                <div className="relative">
                  <Avatar size={"large"} id={booking.customer.customer_attributes.profile_id ?? "none"} name={booking.customer.customer_attributes.full_name} avatar_url={booking.customer.customer_attributes.avatar} />
                </div>
                <div>
                  <CardTitle className="capitalize text-base">{booking.customer.customer_attributes.full_name}</CardTitle>
                  <CardDescription className="opacity-50 mt-0 leading-3 text-xss">Клиент</CardDescription>
                </div>
              </Link>
            </CardHeader>
          </Card>

          <CardContent className="flex-1 flex flex-col">
            <div className="flex flex-col h-full space-y-6">

              <div className="space-y-4">
                <div className="flex items-center gap-2 font-bold">Услуги <Badge variant={"count"}>{booking.booking_services.length}</Badge></div>

                <div className="grid gap-2.5">
                  {booking.booking_services.length > 0 ? booking.booking_services.map((service, idx) => (
                    <BookingServiceCard
                      key={idx}
                      service={service}
                      employee={service.user}
                      start_time={service.booking_service_start_time}
                      end_time={service.booking_service_end_time}
                      is_mimi
                    />
                  )) : <div className="text-sm opacity-50">Нет выбранных услуг.</div>}
                </div>
              </div>

            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between gap-2.5 py-8 border-b border-border">
                <p className="font-medium text-lg opacity-50">Итого</p>
                <span className="font-bold text-lg">{formatPrice(order?.subtotal ? order.subtotal : booking.booking_services.reduce((sum, s) => sum + s.booking_service_price, 0))} руб.</span>
              </div>
              <div className="flex gap-3">
                <Button type={"button"} isLoading={false} disabled={false} onClick={() => {}} size={"size_60"} variant={"white"} className="p-5">
                  Сохранить
                </Button>
                <Button type={"button"} isLoading={false} disabled={false} onClick={() => {}} size={"size_60"} className="w-full">Оплатить</Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

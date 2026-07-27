import { BookingServiceCard } from "@/entities/booking";
import type { IOrderDetail } from "@/entities/orders";
import { Avatar } from "@/entities/user";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui";
import { formatPrice } from "@/shared/utils";
import { Link } from "@tanstack/react-router";

interface IOrderDetailsProps {
  order: IOrderDetail;
}

export const OrderDetails = ({ order }: IOrderDetailsProps) => {
  return (
    <div className="mt-8 h-full">
      <div className="grid grid-cols-3 gap-8 h-full">
        <div className="col-span-2 space-y-8">content</div>

        <Card className="flex flex-col">

          <Card className="bg-transparent">
            <CardHeader className="p-0">
              <Link to={`/customers/${order.bookings[0].customer.id}`} className="flex flex-row items-center gap-2.5 p-5 hover:bg-card rounded-t-3xl duration-200">
                <div className="relative">
                  <Avatar size={"large"} id={order.bookings[0].customer.id} name={order.bookings[0].customer.full_name} avatar_url={order.bookings[0].customer.avatar} />
                </div>
                <div>
                  <CardTitle className="capitalize text-base">{order.bookings[0].customer.full_name}</CardTitle>
                  <CardDescription className="opacity-50 mt-0 leading-3 text-xss">Клиент</CardDescription>
                </div>
              </Link>
            </CardHeader>
          </Card>

          <CardContent className="flex-1 flex flex-col">
            <div className="flex flex-col h-full space-y-6">

              <div className="space-y-4">
                <div className="flex items-center gap-2 font-bold">Услуги <Badge variant={"count"}>{order.bookings[0].booking_services.length}</Badge></div>

                <div className="grid gap-2.5">
                  {order.bookings[0].booking_services.length > 0 ? order.bookings[0].booking_services.map((service, idx) => (
                    <BookingServiceCard
                      key={idx}
                      service={service}
                      employee={service.user}
                      start_time={service.booking_service_start_time}
                      end_time={service.booking_service_end_time}
                    />
                  )) : <div className="text-sm opacity-50">Нет выбранных услуг.</div>}
                </div>
              </div>

            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between gap-2.5 py-8 border-b border-border">
                <p className="font-medium opacity-50">Итого</p>
                <span className="font-semibold">{formatPrice(order.subtotal ? order.subtotal : order.bookings[0].booking_services.reduce((sum, s) => sum + s.booking_service_price, 0))} руб.</span>
              </div>
              <div className="flex gap-3">
                <Button type={"button"} isLoading={false} disabled={false} size={"size_60"} variant={"white"} className="p-5">
                  Сохранить
                </Button>
                <Button type={"button"} isLoading={false} disabled={false} size={"size_60"} className="w-full">Оплатить</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

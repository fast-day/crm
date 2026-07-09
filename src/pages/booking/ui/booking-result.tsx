import { useGetBookingQuery } from "@/entities/booking";
import { Avatar } from "@/entities/user";
import { ORDER_STATUS, ORDER_STATUS_TITLE } from "@/shared/constants/order-status.constant";
import SvgCalendar from "@/shared/icons/Calendar";
import { Badge, Button, Card, CardContent, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui";
import { formatPrice, minuteFormat } from "@/shared/utils";
import { BookingNotFound } from "@/widgets/booking";
import { Link } from "@tanstack/react-router";
import { AlertCircle, CircleCheck, Clock, DollarSign } from "lucide-react";
import React from "react";

interface BookingResultProps {
  booking_id: string;
}

const statusIcon: Record<OrderStatusType, React.ReactNode> = {
  pending: <Clock />,
  open:    <SvgCalendar />,
  closed:  <AlertCircle />,
  paid:    <CircleCheck />,
  unpaid:  <DollarSign />,
};

export const BookingResult = ({ booking_id }: BookingResultProps) => {
  const { data, isLoading, isError } = useGetBookingQuery({ booking_id });
  
  if (isLoading || !data) return null;

  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle></PageHeaderTitle>
        </div>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {isError && <BookingNotFound />}

      <div className="flex items-center justify-center">

        <Card className="max-w-135 w-full mx-auto">
          <CardContent className="space-y-8">
            
            
            <div className="flex items-center flex-col justify-center gap-6">
              <Badge
                className="w-30 h-30 rounded-full text-white [&>svg]:size-20"
                variant={data.order.status}
              >
                {statusIcon[data.order.status]}
              </Badge>
              
              <div className="flex flex-col items-center space-y-2.5">
                <h3 className="text-2xl font-bold">{ORDER_STATUS_TITLE[data.order.status]}</h3>
                {/* <Badge variant={data.order.status} className="py-1 px-2 text-xss text-white rounded-lg">{ORDER_STATUS[data.order.status].label}</Badge> */}
                <Badge variant={`${data.order.status}`} className="px-2 py-0.5 text-xss! font-bold rounded-lg border-none text-white">
                    {(() => {
                      const status = ORDER_STATUS[data.order.status];
                      const Icon = status.icon;
                      return (
                        <>
                          <Icon />
                          {status.label}
                        </>
                      );
                    })()}
                </Badge>
              </div>
            </div>

            <div className="space-y-6">

              <div className="border-b border-border rounded-full" />

              <div>
                
                <div className="grid grid-cols-[48px_1fr_140px] space-y-2">
                  <div className="text-sm opacity-50 text-center">#</div>
                  <div className="text-sm opacity-50">Название</div>
                  <div className="text-sm opacity-50 text-end">Цена</div>
                </div>

                <div>
                  {data.services.map((service, idx) => (
                    <React.Fragment key={idx}>
                      <div className="py-2.5 grid grid-cols-[48px_1fr_140px]">
                        <div className="text-sm flex items-center justify-center">
                          <div className="bg-white w-6.5 h-6.5 opacity-80 rounded-md flex items-center justify-center">{idx+1}</div>
                        </div>
                        <div className="flex gap-2.5 items-center">
                          <Avatar size={"large"} id={service.service.id} name={service.service.name} avatar_url={service.service.avatar} />
                          <div>
                            <div className="font-medium text-sm leading-3.5">{service.service.name}</div>
                            <div className="flex items-center gap-2">
                              <div className="text-xss font-medium">{minuteFormat(service.service.duration)}</div>
                              <span className="font-extrabold opacity-80">·</span>
                              <p className="text-xss font-medium leading-4">{data.employee.full_name}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-medium flex flex-col items-end">
                          <p>{formatPrice(service.booking_service_price)} ₽</p>
                        </div>
                      </div>

                      {idx !== data.services.length - 1 && <div className="w-full h-px bg-border" />}
                    </React.Fragment>
                  ))}
                </div>

              </div>

              <div className="border-b border-border rounded-full" />
              <div className="flex items-center justify-between gap-2.5">
                <p className="font-medium opacity-50">Итоговая цена</p>
                <p className="font-bold">{formatPrice(data.order.subtotal)} ₽</p>
              </div>

              <div className="border-b border-border rounded-full" />

              <div className="flex items-center justify-center gap-2.5">
                <Link to={`/bookings/${data.id}`} className="w-full">
                  <Button size={"size_60"} variant={"white"} className="px-6">Посмотреть запись</Button>
                </Link>
                {(data.order.status === "paid" || data.order.status === "closed" || data.order.status === "unpaid") && (
                  <Link to={"/bookings/create"} className="w-full">
                    <Button size={"size_60"} className="px-6">Новоя запись</Button>
                  </Link>
                )}
                {data.order.status === "unpaid" && (
                  <Link to={`/bookings/${data.id}/checkout`} className="w-full">
                    <Button size={"size_60"} className="px-6">Оплатить</Button>
                  </Link>
                )}
              </div>

            </div>

          </CardContent>
        </Card>

      </div>
    </>
  )
}

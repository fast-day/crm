import { BookingCurrentDate, type IBookingDetail } from "@/entities/booking"
import { ChevronIcon } from "@/shared/icons";
import { Button, Card, CardContent, CardContentLabel, CardContentLabelDescription, CardContentLabelTitle, CardHeader, CardTitle } from "@/shared/ui";
import { formatPrice } from "@/shared/utils";
import { Link } from "@tanstack/react-router";
import { BookingServices } from "./components/booking-services";
import { BookingDetailCustomer } from "./components/booking-detail-customer";
import { BookingOrderCard } from "@/features/booking";

interface BookingDetailsProps {
  booking: IBookingDetail;
}

export const BookingDetails = ({ booking }: BookingDetailsProps) => {
  return (
    <div className="mt-8 h-full">
      
      <div className="grid grid-cols-3 gap-8 h-full">
      
      <div className="col-span-2 space-y-8">
        <BookingServices booking_services={booking.booking_services} />

        <BookingDetailCustomer customer={booking.customer} />
      </div>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center justify-between w-full">
              <p>Итого</p>
              <span>{formatPrice(booking.order ? booking.order.subtotal : booking.booking_services.reduce((sum, s) => sum + s.booking_service_price, 0))} руб.</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            <div className="flex flex-col h-full space-y-6">
              
              {booking.order && <BookingOrderCard order={booking.order} />}

              <BookingCurrentDate
                date={booking.date}
                start_time={booking.start_time}
                end_time={booking.end_time}
              />
              
              <CardContentLabel>
                <CardContentLabelTitle>Примечание к бронированию</CardContentLabelTitle>
                <CardContentLabelDescription>{booking.comment ?? "-"}</CardContentLabelDescription>
              </CardContentLabel>
            </div>

            {(!booking.order || booking.order.status !== "paid") && (
              <div className="flex gap-3">
                {/* <Link to={"edit"}>
                  <Button type={"button"} size={"icon_60"} variant={"white"} className="p-5">
                    <PencilEditIcon width={24} height={24} />
                  </Button>
                </Link> */}
                <Link to={`/orders/checkout/sell?booking_id=${booking.id}${booking.order ? `&order_id=${booking.order.id}` : ``}`} className="w-full">
                  <Button type={"button"} size={"size_60"} iconRight={<ChevronIcon width={20} height={20} />} className="w-full">Продолжить</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

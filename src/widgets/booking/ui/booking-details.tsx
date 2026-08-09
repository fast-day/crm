import { BookingCurrentDate, type IBookingDetail } from "@/entities/booking"
import { ChevronIcon } from "@/shared/icons";
import { Button, CardContentLabel, CardContentLabelDescription, CardContentLabelTitle } from "@/shared/ui";
import { formatPrice } from "@/shared/utils";
import { Link } from "@tanstack/react-router";
import { BookingServices } from "./components/booking-services";
import { BookingDetailCustomer } from "./components/booking-detail-customer";
import { BookingOrderCard } from "@/features/booking";
import { ContentPanel } from "@/widgets/ content-panel";
import { ContentLayout } from "@/widgets/layout";

interface BookingDetailsProps {
  booking: IBookingDetail;
}

export const BookingDetails = ({ booking }: BookingDetailsProps) => {
  return (
    <div className="mt-8 h-full">
      
      <div className="flex h-full flex-col-reverse 1100:flex-row gap-8">
      
        <ContentLayout>
          <BookingServices booking_services={booking.booking_services} />

          <BookingDetailCustomer customer={booking.customer} />
        </ContentLayout>

        <ContentPanel
          title={<p>Итого</p>}
          headerExtra={<span>{formatPrice(booking.invoice.subtotal ? booking.invoice.subtotal : booking.booking_services.reduce((sum, s) => sum + s.booking_service_price, 0))} руб.</span>}
          content={
            <div className="flex flex-col h-full space-y-6">
              {booking.orders && (
                <div className="grid space-y-4">
                  {booking.orders.map((order, idx) => (
                    <BookingOrderCard
                      key={idx}
                      {...order}
                    />
                  ))}
                </div>
              )}

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
          }
          actions={
            (booking.status === "new") && (
              <div className="flex gap-3">
                {/* <Link to={"edit"}>
                  <Button type={"button"} size={"icon_60"} variant={"white"} className="p-5">
                    <PencilEditIcon width={24} height={24} />
                  </Button>
                </Link> */}
                <Link to={`/orders/checkout/sell?booking_id=${booking.id}${booking.order_id ? `&order_id=${booking.order_id}` : ``}`} className="w-full block">
                  <Button
                    type={"button"}
                    size={"icon_60"}
                    className={"w-full"}
                    iconRight={<ChevronIcon width={20} height={20} />}
                  >Продолжить</Button>
                </Link>
              </div>
            )
          }
        />

      </div>
    </div>
  )
}

import { BookingServiceCard, type IBookingService } from "@/entities/booking"
import { Card, CardHeader, CardContent, Badge, CardTitle } from "@/shared/ui"

interface IBookingServicesProps {
  booking_services: IBookingService[];
}

export const BookingServices = ({ booking_services }: IBookingServicesProps) => {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2">Услуги <Badge variant={"count"}>{booking_services.length}</Badge></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid space-y-2.5">
          {booking_services.length > 0 ? booking_services.map((service, idx) => (
            <BookingServiceCard
              key={idx}
              service={service}
              employee={service.user}
              start_time={service.booking_service_start_time}
              end_time={service.booking_service_end_time}
            />
          )) : <div className="text-sm opacity-50">Нет выбранных услуг.</div>}
        </div>
      </CardContent>
    </Card>
  )
}

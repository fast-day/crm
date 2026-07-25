import { BookingServiceCard, type IBookingService } from "@/entities/booking"
import { Card, CardHeader, CardContent, Badge, CardTitle } from "@/shared/ui"
import React from "react"

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
        <div className="grid">
          {booking_services.length > 0 ? booking_services.map((service, idx) => (
            <React.Fragment key={idx}>
              <BookingServiceCard
                service={service}
                employee={service.user}
                start_time={service.booking_service_start_time}
                end_time={service.booking_service_end_time}
              />

              {idx !== booking_services.length - 1 && <div className="w-full h-px bg-border/80 my-3" />}
            </React.Fragment>
          )) : <div className="text-sm opacity-50">Нет выбранных услуг.</div>}
        </div>
      </CardContent>
    </Card>
  )
}

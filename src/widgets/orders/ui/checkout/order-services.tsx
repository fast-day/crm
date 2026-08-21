import { BookingServiceCard } from "@/entities/booking"
import { orderSelector } from "@/entities/orders"
import { useAppSelector } from "@/shared/hooks"
import { Badge } from "@/shared/ui"

export const OrderServices = () => {
  const services = useAppSelector(orderSelector).services;
  
  return (
    <div className="flex flex-col h-full space-y-6 mt-6">

      <div className="space-y-4">
        <div className="flex items-center gap-2 font-bold">Услуги <Badge variant={"count"}>{services.length}</Badge></div>

        <div className="grid gap-2.5">
          {services.length > 0 ? services.map((service, idx) => (
            <BookingServiceCard
              key={idx}
              service={service}
              employee={service.user}
              start_time={service.booking_service_start_time}
              end_time={service.booking_service_end_time}
              is_mimi
              is_marking_order
            />
          )) : <div className="text-sm opacity-50">Нет выбранных услуг.</div>}
        </div>
      </div>

    </div>
  )
}

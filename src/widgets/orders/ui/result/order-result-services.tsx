import type { IBooking } from "@/entities/booking";
import { Avatar } from "@/entities/user"
import { PaletteIcon } from "@/shared/icons"
import { Card, CardContent } from "@/shared/ui"
import { formatPrice, minuteFormat } from "@/shared/utils"

interface IOrderResultServicesProps {
  bookings: Omit<IBooking[], "payment_method" | "order_id" | "payment_method" | "subtotal">;
}

export const OrderResultServices = ({ bookings }: IOrderResultServicesProps) => {
  return (
    <div>
      
      <div className="grid grid-cols-[48px_1fr_140px] space-y-2 items-center">
        <div className="text-sm opacity-50 text-center">#</div>
        <div className="text-sm opacity-50">Название</div>
        <div className="text-sm opacity-50 text-end">Цена</div>
      </div>

      <div>
        {bookings[0].booking_services.map((service, idx) => (
          <Card key={idx} className="bg-transparent">
            <CardContent className="py-2.5 px-0 grid grid-cols-[48px_1fr_140px]">
              <div className="text-sm flex items-center justify-center">
                <div className="bg-white/50 w-6.5 h-6.5 opacity-80 rounded-8 text-xs flex items-center justify-center">{idx+1}</div>
              </div>
              <div className="flex gap-2.5 items-center">
                <Avatar
                  size={"large"}
                  id={service.service.service_id}
                  name={service.service.name}
                  avatar_url={service.service.avatar}
                  isIcon
                  icon={<PaletteIcon width={22} height={22} />}
                />
                <div>
                  <div className="font-medium text-sm leading-4">{service.service.name}</div>
                  <div className="flex items-center gap-2">
                    <div className="text-xss font-medium leading-4">{minuteFormat(service.service.duration)}</div>
                    <span className="font-extrabold opacity-80 leading-4">·</span>
                    <p className="text-xss font-medium leading-4">{service.user.full_name}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <span className="text-xss font-medium mx-0.5 opacity-50">{service.booking_service_count}</span>
                    <span className="text-xss font-medium mx-0.5 opacity-50">×</span>
                  </div>
                  <p className="font-bold text-sm">{formatPrice(service.booking_service_price)} ₽</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  )
}

import { Avatar } from "@/entities/user";
import { formatPrice, minuteFormat } from "@/shared/utils";
import { Link } from "@tanstack/react-router";
import type { IBookingUserType, IBookingService } from "../model/types/booking.type";
import { Card, CardContent } from "@/shared/ui";
import { PaletteIcon } from "@/shared/icons";
import { BookingAddServiceActions } from "@/features/booking";

interface IBookingServiceCardProps {
  service: IBookingService;
  employee: IBookingUserType;
  start_time: string;
  end_time: string;
  is_mimi?: boolean;
}

export const BookingServiceCard = ({ service, employee, start_time, end_time, is_mimi=false }: IBookingServiceCardProps) => {
  return (
    <Card>
      <CardContent className={`p-4 flex ${is_mimi ? "flex-col space-y-3" : "items-center justify-between gap-2.5"}`}>
        <div className="flex gap-2.5 items-center">
          <Link to={`/business/services/${service.service.service_id}`}>
            <Avatar
              size={"lg"}
              id={service.service.service_id}
              name={service.service.name}
              avatar_url={service.service.avatar}
              isIcon
              icon={<PaletteIcon width={22} height={22} />}
            />
          </Link>
          <div>
            <Link to={`/business/services/${service.service.service_id}`} className="block font-semibold text-base leading-5 capitalize">{service.service.name}</Link>
            <div className="flex items-center gap-3.5">
              <div className="leading-3.5">
                <span className="text-sm font-medium">{start_time}</span>
                <span className="text-sm font-medium"> - </span>
                <span className="text-sm font-medium">{`${end_time}`}</span>
              </div>
              <div className="text-sm font-medium opacity-50">{minuteFormat(service.service.duration)}</div>
              <Link to={`/employees/users/${employee.user_id}`} className="flex items-center gap-2">
                <Avatar size={"xs"} avatar_url={employee.avatar} name={employee.first_name} id={employee.user_id} />
                <p className="text-sm font-medium leading-3.5">{employee.full_name}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {is_mimi && <BookingAddServiceActions booking_service_count={service.booking_service_count} />}
          <div className="text-md font-bold">{formatPrice(service.booking_service_price)} ₽</div>
        </div>
      </CardContent>
    
    </Card>
  )
}

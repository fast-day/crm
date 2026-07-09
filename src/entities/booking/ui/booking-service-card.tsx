import { Avatar } from "@/entities/user";
import { markClasses } from "@/shared/constants";
import { cn, formatPrice, minuteFormat } from "@/shared/utils";
import { Link } from "@tanstack/react-router";
import type { IBookingEmployee, IBookingService } from "../model/types/booking.type";

interface IBookingServiceCardProps {
  service: IBookingService;
  employee: IBookingEmployee;
  start_time: string;
  end_time: string;
}

export const BookingServiceCard = ({ service, employee, start_time, end_time }: IBookingServiceCardProps) => {
  return (
    <div className="flex gap-2.5 items-center justify-between">
      <div className="flex gap-2.5 items-center">
        <Link to={`/business/services/${service.service.id}`} className="relative">
          <Avatar size={"md"} id={service.service.id} name={service.service.name} avatar_url={service.service.avatar} />
          <div className={cn("absolute -bottom-px -right-px w-2 h-2 rounded-full",  markClasses[service.service.mark ?? "red"])} />
        </Link>
        <div>
          <Link to={`/business/services/${service.service.id}`} className="block font-medium text-md leading-5">{service.service.name}</Link>
          <div className="flex items-center gap-3.5">
            <div className="leading-4.5">
              <span className="text-xs font-medium">{start_time}</span>
              <span className="text-xs font-medium"> - </span>
              <span className="text-xs font-medium">{end_time}</span>
            </div>
            <div className="text-xs font-medium">{minuteFormat(service.service.duration)}</div>
            <Link to={`/employees/users/${employee.id}`} className="flex items-center gap-2">
              <Avatar size={"xs"} avatar_url={employee.avatar} name={employee.first_name} id={employee.id} />
              <p className="text-xs font-medium leading-4">{employee.full_name}</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-md font-bold">{formatPrice(service.booking_service_price)} ₽</div>
    </div>
  )
}

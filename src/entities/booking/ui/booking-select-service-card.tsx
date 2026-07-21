import type { IDirectoryLocationEmployee, IDirectoryLocationService } from "@/entities/directories";
import { Avatar } from "@/entities/user";
import { markClasses } from "@/shared/constants";
import { cn, formatDate, formatPrice, minuteFormat } from "@/shared/utils";

interface BookingSelectServiceCardProps {
  service?: IDirectoryLocationService;
  employee?: IDirectoryLocationEmployee;
  date?: string;
  time?: string;
  onClick: () => void;
}

export const BookingSelectServiceCard = ({ service, employee, date, time, onClick }: BookingSelectServiceCardProps) => {
  return (
    <div className="flex gap-2.5 cursor-pointer" onClick={onClick}>
      {service && (
        <div className="relative">
          <Avatar size={"lg"} id={service.id} avatar_url={service.avatar} name={service.name} />
          <div className={cn("absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full",  markClasses[service.mark ?? "red"])} />
        </div>
      )}
      <div className="flex-1 flex flex-col justify-center">
        {service && <div className="text-md font-medium leading-5">{service.name}</div>}
        <div className="flex items-center gap-3">
          {date && <div className="text-xs leading-3.5">{formatDate(date)}</div>}
          {time && <div className="text-xs leading-3.5">{time}</div>}
          {service && <div className="text-xs leading-3.5">{minuteFormat(service.duration)}</div>}
          {employee && (
            <div className="flex items-center gap-1.5">
              <Avatar size={"xs"} avatar_url={""} name={employee.first_name} id={employee.id} />
              <p className="text-xs leading-3.5">{employee.full_name}</p>
            </div>
          )}
        </div>
      </div>
      {service && <div className="text-md font-semibold">{formatPrice(service.prices.price)} ₽</div>}
    </div>
  )
}

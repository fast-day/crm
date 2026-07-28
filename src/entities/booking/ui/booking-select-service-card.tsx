import type { IDirectoryLocationEmployee, IDirectoryLocationService } from "@/entities/directories";
import { Avatar } from "@/entities/user";
import { PaletteIcon } from "@/shared/icons";
import { Card, CardContent } from "@/shared/ui";
import { formatDate, formatPrice, minuteFormat } from "@/shared/utils";

interface BookingSelectServiceCardProps {
  service?: IDirectoryLocationService;
  employee?: IDirectoryLocationEmployee;
  date?: string;
  time?: string;
  onClick: () => void;
}

export const BookingSelectServiceCard = ({ service, employee, date, time, onClick }: BookingSelectServiceCardProps) => {
  return (
    <Card onClick={onClick} className="cursor-pointer">
      <CardContent className="flex gap-2.5 p-4">
        {service && (
          <div className="relative">
            <Avatar
              size={"lg"}
              id={service.id}
              name={service.name}
              avatar_url={service.avatar}
              isIcon
              icon={<PaletteIcon width={22} height={22} />}
            />
          </div>
        )}
        <div className="flex-1 flex flex-col justify-center">
          {service && <div className="text-md font-medium leading-5">{service.name}</div>}
          <div className="flex items-center gap-3">
            {date && <div className="text-xs font-medium leading-3.5">{formatDate(date)}</div>}
            {time && <div className="text-xs font-medium leading-3.5">{time}</div>}
            {service && <div className="text-xs font-medium leading-3.5">{minuteFormat(service.duration)}</div>}
            {employee && (
              <div className="flex items-center gap-1.5">
                <Avatar size={"xs"} avatar_url={""} name={employee.first_name} id={employee.id} />
                <p className="text-xs font-medium leading-3.5">{employee.full_name}</p>
              </div>
            )}
          </div>
        </div>
        {service && <div className="text-md font-bold">{formatPrice(service.prices.price)} ₽</div>}
      </CardContent>
    </Card>
  )
}

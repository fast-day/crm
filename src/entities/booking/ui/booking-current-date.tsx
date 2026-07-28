import { CalendarIcon } from '@/shared/icons'
import { Card, CardContent } from '@/shared/ui'
import { formatDateWeek } from '@/shared/utils'

interface IBookingCurrentDateProps {
  date: string;
  start_time: string;
  end_time: string;
}

export const BookingCurrentDate = ({ date, start_time, end_time }: IBookingCurrentDateProps) => {
  return (
    <Card className="relative">
      <CardContent>
        <div className="text-center flex flex-col font-semibold text-lg">
          <span>{formatDateWeek(date)}</span>
          <div className="flex items-center justify-center">
            <span className="text-md opacity-70 font-medium leading-4.5">{start_time}</span>
            <span className="mx-0.5 text-md opacity-70 font-medium leading-4.5">-</span>
            <span className="text-md opacity-70 font-medium leading-4.5">{end_time}</span>
          </div>
        </div>
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-card-accent border-4 border-card-ring w-11 h-11 flex items-center justify-center rounded-full">
          <CalendarIcon width={22} height={22}/>
        </div>
      </CardContent>
    </Card>
  )
}

import { setBookingCreate } from "@/entities/booking";
import { useEmployeeScheduleSlotsQuery } from "@/entities/directories"
import { BookingChangeTime } from "@/features/booking";
import { useAppDispatch } from "@/shared/hooks";

interface BookingScheduleIntervalsProps {
  user_id: string;
  location_id: string;
  date: string;
  duration: number;
  current_time: string | undefined;
}

export const BookingScheduleIntervals = ({ user_id, location_id, date, duration, current_time }: BookingScheduleIntervalsProps) => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useEmployeeScheduleSlotsQuery({
    params: { user_id, location_id },
    query: { date, duration },
  }, { refetchOnMountOrArgChange: true });

  return (
    <div>
      {isError && <div className="text-xs text-center my-6">Сотрудник не работает в выбранный день.</div>}
      {isLoading && <div className="text-xs text-center my-6">Загружаем свободные слоты.</div>}
      {!isLoading && !data?.length && <div className="text-xs text-center my-6">Нет свободных слотов.</div>}
      <div className="grid grid-cols-3 gap-2.5">
        {!isError && data && data.map((item, idx) => (
          <BookingChangeTime
            key={idx}
            time={item}
            current_time={current_time}
            onChange={() => dispatch(setBookingCreate({ time: item }))}
          />
        ))}
      </div>
    </div>
  )
}

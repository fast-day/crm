import { minutesToTop, parseTimeToMinutes, type DayInfo } from "@/features/calendar";
import { CurrentTimeLine } from "./current-time-line";
import type { IBooking } from "@/entities/booking";
import { PX_PER_MINUTE, TIMELINE_HEIGHT } from "@/features/calendar/model/constants/timeline.constant";

interface TimelineDayColProps {
  date: Date;
  dayInfo?: DayInfo;
  bookings: IBooking[];
  slots: {start: string, end: string}[];
  isToday: boolean;
  onSlotClick: (date: Date, slotStart: string) => void;
}

export const TimelineDayCol = ({ date, dayInfo, bookings, slots, isToday, onSlotClick }: TimelineDayColProps) => {
  const isDayOff = !dayInfo || dayInfo.kind === "weekend";

  console.log(isDayOff)

  return (
    <div className="relative flex-1 border-l" style={{ height: TIMELINE_HEIGHT }}>
      {isDayOff ? (
        <div className="absolute inset-0 flex justify-center bg-red/40 p-5 text-xs">
          Выходной
        </div>
      ) : (
        <>
          {slots.map((slot) => {
            const top = minutesToTop(parseTimeToMinutes(slot.start));
            const height = minutesToTop(parseTimeToMinutes(slot.end)) - top;

            return (
              <button
                key={slot.start}
                className="group absolute left-0 right-0 hover:bg-primary/10 transition-colors"
                style={{ top, height }}
                onClick={() => onSlotClick(date, slot.start)}
              >
                <span className="pointer-events-none absolute left-1 top-1/2 hidden -translate-y-1/2 rounded bg-primary px-2 py-1 text-xs text-primary-foreground group-hover:block">
                  {slot.start} — Добавить запись
                </span>
              </button>
            );
          })}

          {bookings.map((booking) => {
            const startMinutes = parseTimeToMinutes(booking.start_time);
            const endMinutes = parseTimeToMinutes(booking.end_time);
            const top = minutesToTop(startMinutes);
            const height = (endMinutes - startMinutes) * PX_PER_MINUTE;

            return (
              <div
                key={booking.id}
                className="absolute left-1 right-1 z-10 overflow-hidden rounded bg-primary/80 px-1 text-xs text-primary-foreground"
                style={{ top, height }}
              >
                {booking.customer.full_name}
              </div>
            );
          })}

          {isToday && <CurrentTimeLine />}
        </>
      )}
    </div>
  );
};

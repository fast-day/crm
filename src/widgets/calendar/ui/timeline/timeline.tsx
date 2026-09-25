import { minutesToTop, type DayInfo } from "@/features/calendar";
import { useEffect, useRef } from "react"
import { TimelineAxis } from "./components/timeline-axis";
import { TimelineDayCol } from "./components/timeline-day-col";
import { format } from "date-fns"
import type { IBooking } from "@/entities/booking";

export interface ITimelineViewProps {
  days: Date[];
  dayInfoByKey: Map<string, DayInfo>;
  bookingsByKey: Map<string, IBooking[]>;
  slotsByKey: Map<string, {start: string, end: string}[]>;
  onSlotClick: (date: Date, slotStart: string) => void;
}

export const CalendarTimeline = ({ days, dayInfoByKey, bookingsByKey, slotsByKey, onSlotClick }: ITimelineViewProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const todayKey = format(new Date(), "yyyy-MM-dd");
  
  console.log(slotsByKey)

  useEffect(() => {
    if (!scrollRef.current) return;
    const now = new Date();
    const top = minutesToTop(now.getHours() * 60 + now.getMinutes());
    scrollRef.current.scrollTo({ top: top - 200, behavior: "instant" });
  }, []);

  console.log(days)

  return (
    <div ref={scrollRef} className="flex">
      <TimelineAxis />
      {days.map((date) => {
        const dateKey = format(date, "yyyy-MM-dd");
        return (
          <TimelineDayCol
            key={dateKey}
            date={date}
            dayInfo={dayInfoByKey.get(dateKey)}
            bookings={bookingsByKey.get(dateKey) ?? []}
            slots={slotsByKey.get(dateKey) ?? []}
            isToday={dateKey === todayKey}
            onSlotClick={onSlotClick}
          />
        );
      })}
    </div>
  );
};
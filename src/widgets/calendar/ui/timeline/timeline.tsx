import { minutesToTop, type DayInfo } from "@/features/calendar";
import { useEffect, useRef } from "react"
import { TimelineAxis } from "./components/timeline-axis";
import { TimelineDayCol } from "./components/timeline-day-col";
import { format } from "date-fns"

export interface ITimelineViewProps {
  days: Date[];
  dayInfoByKey: Map<string, DayInfo>;
}

export const CalendarTimeline = ({ days, dayInfoByKey }: ITimelineViewProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const todayKey = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    if (!scrollRef.current) return;
    const now = new Date();
    const top = minutesToTop(now.getHours(), now.getMinutes());
    scrollRef.current.scrollTo({ top: top - 200, behavior: "instant" });
  }, []);

  return (
    <div ref={scrollRef} className="flex overflow-y-auto max-h-150">
      <TimelineAxis />
      {days.map((date) => {
        const dateKey = format(date, "yyyy-MM-dd");
        return (
          <TimelineDayCol
            key={dateKey}
            date={date}
            dayInfo={dayInfoByKey.get(dateKey)}
            isToday={dateKey === todayKey}
          />
        );
      })}
    </div>
  )
}

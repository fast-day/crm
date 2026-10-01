import { useMemo } from "react";
import { useCalendarCurrentTime } from "../../model/hooks/calendar-current-time.hook";
import { formatTime } from "../../model/utils/formatter.util";
import { ru } from "date-fns/locale";

interface ICalendarTimelineProps {
  firstHour: number;
  lastHour: number;
}

export const CalendarTimeline = ({ firstHour, lastHour }: ICalendarTimelineProps) => {
  const { current } = useCalendarCurrentTime();

  const currentHour = current.getHours();

  const isVisible = currentHour >= firstHour && currentHour < lastHour;

  const position = useMemo(() => {
    const min = current.getHours() * 60 + current.getMinutes();
    const visibleStart = firstHour * 60;
    const visibleEnd = lastHour * 60;
    const visibleRange = visibleEnd - visibleStart;

    return ((min - visibleStart) / visibleRange) * 100;
  }, [current, firstHour, lastHour]);

  const formattedTime = formatTime(current, ru);

  if (!isVisible) return null;

  return (
    <div
      className="absolute inset-x-0 z-50 border-t border-red pointer-events-none"
      style={{ top: `${position}%` }}
    >
      <div className="absolute -left-8.75 flex justify-end px-1 rounded-md -translate-y-1/2 bg-primary pr-1 text-xss text-white">
        {formattedTime}
      </div>
    </div>
  )
}

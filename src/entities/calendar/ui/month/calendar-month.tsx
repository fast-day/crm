import { useMemo } from "react";
import { useCalendarCells } from "../../model/hooks/calendar-cells.hook";
import { useCalendarEventPosition } from "../../model/hooks/calendar-event-position.hook";
import type { IEvent } from "../../model/types/event-calendar.type"
import { WEEK_DAYS } from "../../model/constants/calendar.constant";
import { DayCell } from "./calendar-day-cell";

interface ICalendarMonthProps {
  singleDays: IEvent[];
  multiDays: IEvent[];
  onSelectDay?: (date: Date) => void;
}

export const CalendarMonth = ({ singleDays, multiDays, onSelectDay }: ICalendarMonthProps) => {
  const selectedDate = new Date();
  const maxEventsPerDayCell = 4;

  const { cells } = useCalendarCells(selectedDate);
  const { event_positions } = useCalendarEventPosition(multiDays, singleDays, selectedDate, maxEventsPerDayCell);

  const allEvents = useMemo(() => [...multiDays, ...singleDays], [multiDays, singleDays]);

  return (
    <div>
      <div className="grid grid-cols-7">
        {WEEK_DAYS.map((d) => (
          <div key={d} className="text-md font-extrabold text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 overflow-hidden">
        {cells.map((cell) => (
          <DayCell
            key={cell.date.toISOString()}
            cell={cell}
            events={allEvents}
            eventPosition={event_positions}
            onSelectDay={onSelectDay}
          />
        ))}
      </div>
    </div>
  )
}

import React, { useMemo } from "react";
import type { ICalendarCell, IEvent } from "../../model/types/event-calendar.type"
import { getMonthCellEvents } from "../../model/utils/event-calendar.util";
import { format, isToday, startOfDay } from "date-fns";
import { cn } from "@/shared/utils";
import EventBullet from "./calendar-event-bullet";
import MonthEventBadge from "./calendar-event-badge";
import { useCalendarCustomization } from "../../model/utils/customization.util";

interface IDellCellProps {
  cell: ICalendarCell;
  events: IEvent[];
  eventPosition: Record<string, number>;
  onSelectDay?: (date: Date) => void;
}

const DEFAULT_MAX_VISIBLE = 3;
const DEFAULT_LIST_HEIGHT = 94;

export const DayCell = ({ cell, events, eventPosition, onSelectDay }: IDellCellProps) => {
  const cellEvents = useMemo(() => getMonthCellEvents(cell.date, events, eventPosition), [cell.date, events, eventPosition]);
  const { maxEventsPerDayCell } = useCalendarCustomization()
  const isSunday = cell.date.getDay() === 0;
  const isDefaultMax = maxEventsPerDayCell === DEFAULT_MAX_VISIBLE;
  const positions = useMemo(() => Array.from({ length: maxEventsPerDayCell }, (_, i) => i), [maxEventsPerDayCell]);

  const handleClick = () => {
    onSelectDay?.(cell.date);
  }

  return (
    <div
      data-date={format(cell.date, "yyyy-MM-dd")}
      className={cn("flex flex-col gap-1 py-1.5 h-full", isSunday && "bg-red")}
    >
      <button
        className={cn(
          "flex items-center justify-center size-6 translate-x-1 rounded-full text-sm hover:bg-primary",
          !cell.current_month && "opacity-20",
          isToday(cell.date) && "bg-primary text-white font-bold hover:bg-primary"
        )}
        onClick={handleClick}
      >{cell.day}</button>

      <div
        className={cn(
          "flex px-2 h-6 gap-1 lg:flex-col lg:gap-2 lg:px-0",
          isDefaultMax ? "lg:h-23.5" : "bc-day-cell-list",
          !cell.current_month && "opacity-50",
        )}
        style={isDefaultMax ? undefined : ({ "--bc-day-cell-list-height": `${(DEFAULT_LIST_HEIGHT / DEFAULT_MAX_VISIBLE) * 3}px` } as React.CSSProperties)}
      >
        {positions.map((pos) => {
          const event = cellEvents.find(e => e.position === pos);
          return (
            <div key={pos} className="lg:flex-1">
              {event && (
                <>
                  <div
                    role={"button"}
                    tabIndex={0}
                    data-event-id={event.id}
                    className={"lg:hidden"}
                  >
                    <EventBullet color={event.mark} />
                  </div>
                  <MonthEventBadge
                    event={event}
                    date={startOfDay(cell.date)}
                    className={"hidden lg:flex"}
                  />
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

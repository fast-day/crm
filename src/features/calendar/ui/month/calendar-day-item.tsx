import { cn } from "@/shared/utils";
import { formatInterval } from "../../model/utils/calendar.util";
import type { CalendarCell, DayInfo } from "../../model/types/calendar.type";
import type { TScheduleItem } from "@/entities/schedule";

interface CalendarDayItemProps {
  dayInfo?: DayInfo;
  isMarked: boolean;
  isToday: boolean;
  isSelected: boolean;
  onClick: (data: TScheduleItem) => void;
  cell: CalendarCell;
  isCurrentDay?: boolean;
}

export const CalendarDayItem = ({ dayInfo, isMarked, isToday, isCurrentDay, onClick, cell, isSelected=false }: CalendarDayItemProps) => {
  return (
    <div
      onClick={() => {
        if (!cell.inMonth) return;
        onClick({
          date_key: cell.dateKey,
          year: cell.year,
          month_index: cell.monthIndex,
          day: cell.day,
          in_month: cell.inMonth,
          day_info: dayInfo,
        });
      }}
      aria-disabled={!cell.inMonth}
      className={cn(
        "1100:aspect-square h-19 1100:h-auto w-full 100:max-w-35 rounded-xl border-2 flex flex-col items-center relative overflow-hidden 1100:py-5 1100:px-3 p-4 border-transparent cursor-pointer", 
        isCurrentDay && "border-primary/30 bg-muted",
        isSelected && "border-primary",
        !cell.inMonth && "bg-transparent! border-accent/10 text-accent/40! justify-center",
        isMarked ? "bg-muted" : "bg-red-accent/30 text-red-accent",
      )}
      aria-label={`День ${cell.day}`}
    >
      <div className={cn(
        `text-sm font-extrabold leading-4 px-3 py-px border-b border-accent 
        ${isToday ? "bg-white rounded-xl text-accent! border-accent!" : ""}`, 
        !isMarked ? "border-red-accent" : "",
        !cell.inMonth ? "border-none" : "",
      )}>{cell.day}</div>

      {cell.inMonth && (
        <div className="flex-1 w-full flex flex-col justify-center items-center gap-0.5">
          {dayInfo?.kind !== "work" && (
            <div className="text-xss text-red-accent">Выходной</div>
          )}

          {dayInfo?.kind === "work" && (
            <>
              <div className="text-xss">
                {formatInterval(dayInfo.intervals[0].start, dayInfo.intervals[0].end)}
              </div>
              {dayInfo.intervals[1] && (
                <div className="text-xss">
                  {formatInterval(dayInfo.intervals[1].start, dayInfo.intervals[1].end)}
                </div>
              )}
              {dayInfo.extraCount > 0 && (
                <div className="text-xss">
                  ...
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

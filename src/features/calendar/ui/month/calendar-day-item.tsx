import { cn } from "@/shared/utils";
import { formatInterval } from "../../model/utils/calendar.util";
import type { CalendarCell, DayInfo } from "../../model/types/calendar.type";
import type { TScheduleItem } from "@/entities/schedule";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

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
  const date = new Date(cell.year, cell.monthIndex, cell.day);
  const weekday = format(date, "EEEE", { locale: ru });
  const month = format(date, "MMMM", { locale: ru });

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
        "1100:aspect-square h-19 1100:h-auto w-full 100:max-w-35 rounded-xl border-2 grid grid-cols-2 1100:space-y-2 1100:flex 1100:flex-col items-center relative overflow-hidden 1100:py-5 1100:px-3 p-4 border-transparent cursor-pointer", 
        isCurrentDay && "border-primary/30 bg-muted",
        isSelected && "border-primary",
        !cell.inMonth && "bg-transparent! border-accent/10 text-accent/40! justify-center",
        isMarked ? "bg-muted" : "bg-red-accent/30 text-red-accent",
      )}
      aria-label={`День ${cell.day}`}
    >
      <div>
        <span className="block 1100:hidden text-xs font-semibold opacity-50 capitalize mb-1">
          {weekday}
        </span>
        <div className={cn(
          `text-xs 1100:text-sm flex gap-1 font-extrabold leading-4 1100:px-3 py-px 1100:border-b border-accent 
          ${isToday ? "1100:bg-white rounded-xl 1100:text-accent! border-accent!" : ""}`, 
          !isMarked ? "border-red-accent" : "",
          !cell.inMonth ? "border-none" : "",
        )}>
          {cell.day}
          <span className="block 1100:hidden capitalize">{month}</span>
        </div>
      </div>

      {cell.inMonth && (
        <div className="flex-1 w-full flex flex-col justify-center items-end 1100:items-center gap-0.5">
          {dayInfo?.kind !== "work" && (
            <div className="text-xss text-red-accent">Выходной</div>
          )}

          {dayInfo?.kind === "work" && (
            <>
              <div className="text-xss 1100:leading-4.5 leading-4">
                {formatInterval(dayInfo.intervals[0].start, dayInfo.intervals[0].end)}
              </div>
              {dayInfo.intervals[1] && (
                <div className="text-xss 1100:leading-4.5 leading-4">
                  {formatInterval(dayInfo.intervals[1].start, dayInfo.intervals[1].end)}
                </div>
              )}
              {dayInfo.extraCount > 0 && (
                <div className="text-xss 1100:leading-4 leading-2">
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

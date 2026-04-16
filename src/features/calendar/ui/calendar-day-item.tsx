import { cn } from "@/shared/utils";
import { formatInterval } from "../model/utils/calendar.util";
import type { CalendarCell, DayInfo } from "../model/types/calendar.type";
import type { ScheduleDialogData } from "@/entities/schedule";

interface CalendarDayItemProps {
  dayInfo?: DayInfo;
  isMarked: boolean;
  isToday: boolean;
  isSelected: boolean;
  handleChangeSchedule: (data: ScheduleDialogData) => void;
  cell: CalendarCell;
}

export const CalendarDayItem = ({ dayInfo, isMarked, isToday, isSelected, handleChangeSchedule, cell }: CalendarDayItemProps) => {
  return (
    <div
      onClick={() => {
        if (!cell.inMonth) return;
        handleChangeSchedule({
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
        "h-40 rounded-xl border-2 flex flex-col items-center relative overflow-hidden p-5", 
        isSelected ? "border-primary/30 bg-muted" : "border-transparent bg-muted-foreground",
        !cell.inMonth ? "bg-transparent! border-accent/10 text-accent/40! justify-center" : "",
        isMarked ? "bg-muted" : "bg-red-100/17 text-red-100",
      )}
      aria-label={`День ${cell.day}`}
    >
      <div className={cn(
        `text-md font-extrabold leading-4 px-3.5 py-0.5 border-b border-accent 
        ${isToday ? "bg-white rounded-xl text-accent! border-accent!" : ""}`, 
        !isMarked ? "border-red-100" : "",
        !cell.inMonth ? "border-none" : "",
      )}>{cell.day}</div>

      {cell.inMonth && (
        <div className="flex-1 w-full flex flex-col justify-center items-center gap-0.5">
          {dayInfo?.kind !== "work" && (
            <div className="text-sm text-red-100">Выходной</div>
          )}

          {dayInfo?.kind === "work" && (
            <>
              <div className="text-xs">
                {formatInterval(dayInfo.intervals[0].start, dayInfo.intervals[0].end)}
              </div>
              {dayInfo.intervals[1] && (
                <div className="text-xs">
                  {formatInterval(dayInfo.intervals[1].start, dayInfo.intervals[1].end)}
                </div>
              )}
              {dayInfo.extraCount > 0 && (
                <div className="text-xs">
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

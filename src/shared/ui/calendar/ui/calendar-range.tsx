import { type DateRange } from "react-day-picker"
import { Card, CardContent } from "../../card"
import { Calendar, CalendarDayButton } from "./calendar"
import { ru } from "date-fns/locale"
import { useEffect, useRef, useState } from "react";
import { Button } from "../../button";
import { CalendarIcon } from "@/shared/icons";
import { formatDateRange } from "../model/utils/format-range";
import { cn } from "@/shared/utils";

interface ICalendarRangeProps {
  range: DateRange | undefined;
  apply?: (range: DateRange) => void;
  numOfMonths?: number;
  className?: string;
}

export const CalendarRange = ({ range, apply, numOfMonths=1, className="" }: ICalendarRangeProps) => {
  const [open, setOpen] = useState(false);
  const [draftRange, setDraftRange] = useState<DateRange | undefined>(range);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpen = () => {
    setDraftRange(range);
    setOpen((prev) => !prev);
  };

  const handleApply = () => {
    if (!draftRange?.from || !draftRange?.to) return;
    setOpen(false);
    apply?.(draftRange);
  };

  return (
    <div className={"relative w-fit"} ref={ref}>
      <Button size={"size_48"} variant={"action"} iconRight={<CalendarIcon width={20} height={20} />} onClick={handleOpen}>
        {formatDateRange(range)}
      </Button>

      {open && (
        <Card
          className={cn(
            "absolute top-full 1100:left-1/2 1100:-translate-x-1/2 mt-2 z-50 bg-background! border border-border mx-auto w-fit p-0 pb-2.5",
            className,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <CardContent className="p-0 space-y-2.5">
            <Calendar
              mode="range"
              defaultMonth={draftRange?.from}
              selected={draftRange}
              locale={ru}
              onSelect={setDraftRange}
              numberOfMonths={numOfMonths}
              captionLayout="dropdown"
              className="[--cell-size:--spacing(9)] md:[--cell-size:--spacing(10)]"
              formatters={{
                formatMonthDropdown: (date) => {
                  return date.toLocaleString("default", { month: "long" })
                },
              }}
              components={{
                DayButton: ({ children, modifiers, day, ...props }) => (
                  <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                    {children}
                  </CalendarDayButton>
                )
              }}
            />
            <div className="px-2.5">
              <Button
                type={"button"}
                onClick={handleApply}
                size={"size_40"}
                className={"font-semibold w-full"}
              >Применить</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

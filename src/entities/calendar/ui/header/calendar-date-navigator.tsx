import { useSelector } from "react-redux";
import { calendarSelector } from "../../model/selector/calendar.selector";
import { useAppDispatch } from "@/shared/hooks";
import { setCalendarCurrentDate } from "../../model/slice/calendar.slice";
import { Button } from "@/shared/ui";
import { ChevronIcon } from "@/shared/icons";
import type { TCalendarView } from "../../model/types/event-calendar.type";
import { formatCalendarPeriod, navigateDate } from "../../model/utils/event-calendar.util";
import { useMemo } from "react";

interface ICalendarDateNavigatorProps {
  view: TCalendarView;
}

export const CalendarDateNavigator = ({ view }: ICalendarDateNavigatorProps) => {
  const dispatch = useAppDispatch();
  const currentDateIso = useSelector(calendarSelector).currentDate;

  const selectedDate = useMemo(() => new Date(currentDateIso), [currentDateIso]);

  const handleSelectedDate = (date: Date) => dispatch(setCalendarCurrentDate(date.toISOString()));

  const handlePrev = () => {
    handleSelectedDate(navigateDate(selectedDate, view, "previous"));
  }

  const handleNext = () => {
    handleSelectedDate(navigateDate(selectedDate, view, "next"));
  }

  const period = useMemo(() => formatCalendarPeriod(selectedDate, view), [selectedDate, view]);

  return (
    <div className="md:flex-1">
      <div className="flex items-center justify-center gap-2.5">
        <Button
          variant={"white"}
          size={"icon_40"}
          animation={"toggle"}
          className={"[&_svg]:w-5 [&_svg]:h-5 [&_svg]:rotate-180"}
          onClick={handlePrev}
        ><ChevronIcon /></Button>

        {typeof period === "string" ? (
          <p className="text-md font-semibold">{period}</p>
        ) : (
          <div className="flex flex-col items-center">
            <span className="font-semibold text-md leading-3">{period.primary}</span>
            <span className="text-xss opacity-50 leading-3 font-medium">{period.secondary}</span>
          </div>
        )}

        <Button
          variant={"white"}
          size={"icon_40"}
          animation={"toggle"}
          className={"[&_svg]:w-5 [&_svg]:h-5"}
          onClick={handleNext}
        ><ChevronIcon  /></Button>
      </div>
    </div>
  )
}

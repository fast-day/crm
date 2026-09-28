import type { TCalendarView } from "../../model/types/event-calendar.type"

interface ICalendarHeaderProps {
  view: TCalendarView;
  onViewChange?: (v: TCalendarView) => void;
}

export const CalendarHeader = ({ view, onViewChange }: ICalendarHeaderProps) => {
  return (
    <div>calendar-header</div>
  )
}

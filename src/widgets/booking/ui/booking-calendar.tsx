import { useCallback, useEffect, useMemo } from 'react'
import { CalendarCustomizationContext, type ICalendarCustomization } from '@/entities/calendar/model/utils/customization.util'
import { CalendarDay, CalendarHeader, calendarSelector, CalendarWeek, setCalendarCurrentDate, type ICalendarProps, type TCalendarView } from '@/entities/calendar'
import type { IBooking, IBookingCalendarQuery } from '@/entities/booking'
import type { ISchedule } from '@/entities/schedule';
import { getCalendarDateRange } from '@/entities/calendar/model/utils/event-calendar.util';
import { useSelector } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { LazyBlur } from '@/widgets/loading';
import { useAppDispatch } from '@/shared/hooks';
import { isSameWeek } from 'date-fns';

interface IBookingCalendarProps extends ICalendarProps {
  start_date?: string;
  bookings?: IBooking[];
  intervals?: ISchedule[];
}

export const BookingCalendar = ({
  start_date,
  bookings,
  intervals,
  isFetching,
  view,
  onViewChange,
  renderEvent,
  renderMonthEvent,
  renderAgendaEvent,
  selectedEventId,
  hourHeight,
  height,
  autoHeight,
  maxEventsPerDayCell,
  allDayMaxRows,
  onShowMore,
  classNames,
  dayCellClassName,
  formatTime,
}: IBookingCalendarProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentDateIso = useSelector(calendarSelector).currentDate;

  const customization = useMemo<ICalendarCustomization>(
    () => ({
      renderEvent,
      renderMonthEvent,
      renderAgendaEvent,
      selectedEventId,
      hourHeight: hourHeight ?? 96,
      height,
      autoHeight,
      maxEventsPerDayCell: maxEventsPerDayCell ?? 4,
      allDayMaxRows,
      onShowMore,
      classNames,
      dayCellClassName,
      formatTime,
    }),
    [
      renderEvent,
      renderMonthEvent,
      renderAgendaEvent,
      selectedEventId,
      hourHeight,
      height,
      autoHeight,
      maxEventsPerDayCell,
      allDayMaxRows,
      onShowMore,
      classNames,
      dayCellClassName,
      formatTime,
    ]
  )

  useEffect(() => {
    if (!start_date) return;

    const urlDateIso = new Date(`${start_date}T00:00:00`).toISOString();
    dispatch(setCalendarCurrentDate(urlDateIso));
  }, [start_date]);

  const handleChangeView = useCallback((v: TCalendarView) => {
    onViewChange?.(v);
    localStorage.setItem("booking_calendar_view", v);

    const current = new Date(currentDateIso);
    const today = new Date();

    const baseDate = v === "day" && view === "week" && isSameWeek(current, today, { weekStartsOn: 1 }) ? today : current;

    dispatch(setCalendarCurrentDate(baseDate.toISOString()));

    const range = getCalendarDateRange(baseDate, v);
    navigate({ to: ".", search: (prev: IBookingCalendarQuery & PaginationQuery) => ({ ...prev, ...range }) });
  }, [onViewChange, view, currentDateIso]);

  return (
    <CalendarCustomizationContext.Provider value={customization}>
      <div className='space-y-6'>
        <CalendarHeader
          view={view}
          onViewChange={handleChangeView}
        />

        <div className='relative'>
          {isFetching && <LazyBlur />}

          {view === "week" && (
            <CalendarWeek
              singleDayEvents={bookings ?? []}
              workingHours={intervals ?? []}
            />
          )}

          {view === "day" && (
            <CalendarDay
              singleDayEvents={bookings ?? []}
              workingHours={intervals?.[0]}
            />
          )}
        </div>
      </div>
    </CalendarCustomizationContext.Provider>
  )
}

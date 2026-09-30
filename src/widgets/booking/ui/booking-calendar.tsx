import { useCallback, useMemo } from 'react'
import { CalendarCustomizationContext, type ICalendarCustomization } from '@/entities/calendar/model/utils/customization.util'
import { CalendarDay, CalendarHeader, CalendarWeek, type ICalendarProps, type TCalendarView } from '@/entities/calendar'
import type { IBooking } from '@/entities/booking'
import type { ISchedule } from '@/entities/schedule';

interface IBookingCalendarProps extends ICalendarProps {
  bookings?: IBooking[];
  intervals?: ISchedule[];
}

export const BookingCalendar = ({
  bookings,
  intervals,
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

  const handleChangeView = useCallback((v: TCalendarView) => {
    onViewChange?.(v);
    localStorage.setItem("booking_calendar_view", v);
  }, [onViewChange]);

  return (
    <CalendarCustomizationContext.Provider value={customization}>
      <div className='space-y-6'>
        <CalendarHeader
          view={view}
          onViewChange={handleChangeView}
        />

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
    </CalendarCustomizationContext.Provider>
  )
}

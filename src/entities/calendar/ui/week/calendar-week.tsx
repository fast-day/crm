import { addDays, areIntervalsOverlapping, format, isSameDay, isSameWeek, startOfWeek } from 'date-fns';
import { DEFAULT_VISIBLE_HOURS, STOCK_SLOT_CLASSES, WEEK_DAYS } from '../../model/constants/calendar.constant';
import type { IEvent } from '../../model/types/event-calendar.type'
import { useCalendarCustomization } from '../../model/utils/customization.util';
import { dateParserIso } from '../../model/utils/formatter.util';
import { getEventBlockStyle, groupEvents, isSlotWorking } from '../../model/utils/event-calendar.util';
import { useCalendarVisibleHours } from '../../model/hooks/calendar-visible-hours.hook';
import { ru } from 'date-fns/locale';
import { cn } from '@/shared/utils';
import { CalendarEventBlock } from './calendar-event';
import { CalendarTimeline } from './calendar-timeline';
import type { ISchedule, IScheduleIntervals } from '@/entities/schedule';
import { Fragment } from 'react/jsx-runtime';

interface ICalendarWeekProps {
  singleDayEvents: IEvent[];
  workingHours: ISchedule[];
  canAdd?: boolean;
}

export const CalendarWeek = ({ singleDayEvents, workingHours, canAdd=true }: ICalendarWeekProps) => {
  const { hourHeight, classNames } = useCalendarCustomization();
  
  const selectedDate = new Date();
  const visibleHours = DEFAULT_VISIBLE_HOURS;

  const { hours, earliest_event_hour, latest_event_hour } = useCalendarVisibleHours(
    visibleHours,
    singleDayEvents,
    workingHours,
  );
  
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const showsToday = isSameWeek(selectedDate, new Date());

  const isScaled = hourHeight !== 96;
  const quarter = hourHeight / 4;

  const slot = (idx: number) => {
    if (!isScaled) return { className: STOCK_SLOT_CLASSES[idx], style: undefined };
    return {
      className: "absolute inset-x-0 cursor-pointer transition-colors hover:bg-accent",
      style: { top: `${quarter * idx}px`, height: `${quarter}px` },
    }
  }

  const getDayEvents = (day: Date): IEvent[] => {
    return singleDayEvents.filter(e =>
      isSameDay(dateParserIso(e.date, e.start_time), day) ||
      isSameDay(dateParserIso(e.date, e.end_time), day)
    );
  }

  const getGroupedEvents = (day: Date) => {
    return groupEvents(getDayEvents(day));
  }

  const getEventStyle = (event: IEvent, day: Date, groupIndex: number, groupSize: number, groupedEvents: IEvent[][]) => {
    const style = getEventBlockStyle(event, new Date(day), groupIndex, groupSize, { from: earliest_event_hour, to: latest_event_hour });
    
    const hasOverlap = groupedEvents.some((g, i) =>
      i !== groupIndex && g.some(e => areIntervalsOverlapping(
        { start: dateParserIso(event.date, event.start_time), end: dateParserIso(event.date, event.end_time) },
        { start: dateParserIso(e.date, e.start_time), end: dateParserIso(e.date, e.end_time) },
      ),
    ));

    if (!hasOverlap) return { ...style, width: "100%", left: "0%" };

    return style;
  }

  const getDayIntervals = (day: Date): IScheduleIntervals[] => {
    return workingHours.find(s => isSameDay(new Date(s.date), day))?.intervals ?? [];
  };

  const handleSlotClick = (date: Date, hour: number, minute: number) => {
    console.log({ date, hour, minute });
  }

  return (
    <div className='flex flex-col max-w-[calc(100dvw-40px)] min-w-0'>
      <div className='overflow-x-auto scrollbar-hidden w-full min-w-0'>
        <div className='lg:min-w-fit min-w-237.5'>
          <div className='contents'>
            <div className='sticky top-0 z-20 flex'>
              <div className='w-10' />
              <div className='grid flex-1 grid-cols-7'>
                {weekDays.map((day, idx) => (
                  <span
                    key={idx}
                    className={'py-1.5 space-x-px min-w-32.5'}
                  >
                    <span className='text-11 font-medium opacity-50'>{WEEK_DAYS[idx]}</span>
                    <span className='ml-1 font-bold text-foreground'>
                      {format(day, "d", { locale: ru })}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className='flex overflow-hidden'>
                <div className='relative w-10'>
                  {hours.map((hour, idx) => (
                    <div
                      key={hour}
                      className='relative'
                      style={{ height: `${hourHeight}px` }}
                    >
                      <div className='absolute -top-3 right-2 flex h-6 items-center'>
                        {idx !== 0 && (
                          <span className='text-xs font-medium opacity-50'>
                            {hour}:00
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className='flex-1 border-l border-border relative'>
                  <div className='grid grid-cols-7 divide-x divide-border'>
                    {weekDays.map((day, idx) => {
                      const groupedEvents = getGroupedEvents(day);
                      const dayIntervals = getDayIntervals(day);

                      return (
                        <div key={idx} className='relative min-w-32.5'>
                          {hours.map((hour, hourIdx) => (
                            <div
                              key={hour}
                              className={cn(
                                "relative",
                                classNames?.hourRow,
                              )}
                              style={{ height: `${hourHeight}px` }}
                            >
                              {hourIdx !== 0 && <div className='pointer-events-none absolute inset-x-0 top-0 border-b border-border'/>}

                              {[0, 15, 30, 45].map((minute, qIdx) => {
                                const start = hour * 60 + minute;
                                const end = start + 15;
                                const isDisabled = !isSlotWorking(start, end, dayIntervals);

                                return (
                                  <Fragment key={minute}>
                                    <div
                                      className={cn(
                                        "pointer-events-none absolute inset-x-0",
                                        isDisabled && "bg-calendar-disabled-hour",
                                      )}
                                      style={isScaled
                                        ? { top: `${quarter * qIdx}px`, height: `${quarter}px` }
                                        : { top: `${24 * qIdx}px`, height: "24px" }
                                      }
                                    />

                                    {canAdd !== false && !isDisabled && (
                                      <div {...slot(qIdx)} onClick={() => handleSlotClick(day, hour, minute)}>
                                        +{hour}:{minute === 0 ? "00" : minute}
                                      </div>
                                    )}
                                  </Fragment>
                                );
                              })}
                            </div>
                          ))}

                          {groupedEvents.map((group, idx) => group.map((event) => (
                            <div
                              key={`group-week-${event.date}T${event.start_time}`}
                              className={"absolute"}
                              style={getEventStyle(event, day, idx, groupEvents.length, groupedEvents)}
                            >
                              <CalendarEventBlock event={event} view={"week"} />
                            </div>
                          )))}
                        </div>
                      )
                    })}
                  </div>
                  {showsToday && <CalendarTimeline firstHour={earliest_event_hour} lastHour={latest_event_hour} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

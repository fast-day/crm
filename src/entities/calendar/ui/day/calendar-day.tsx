import type { ISchedule } from "@/entities/schedule";
import type { IEvent } from "../../model/types/event-calendar.type";
import { useCalendarCustomization } from "../../model/utils/customization.util"
import { DEFAULT_VISIBLE_HOURS, STOCK_SLOT_CLASSES } from "../../model/constants/calendar.constant";
import { useCalendarVisibleHours } from "../../model/hooks/calendar-visible-hours.hook";
import { Fragment, useMemo } from "react";
import { getEventBlockStyle, groupEvents, isSlotWorking } from "../../model/utils/event-calendar.util";
import { dateParserIso } from "../../model/utils/formatter.util";
import { areIntervalsOverlapping, format, isToday } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/shared/utils";
import { CalendarEventBlock } from "../week/calendar-event";
import { CalendarTimeline } from "../week/calendar-timeline";

interface ICalendarDayProps {
  singleDayEvents: IEvent[];
  workingHours: ISchedule;
  canAdd?: boolean;
}

export const CalendarDay = ({ singleDayEvents, workingHours, canAdd }: ICalendarDayProps) => {
  const { hourHeight, classNames } = useCalendarCustomization();

  const selectedDate = new Date();
  const visibleHours = DEFAULT_VISIBLE_HOURS;
  
  const { hours, earliest_event_hour, latest_event_hour } = useCalendarVisibleHours(
    visibleHours,
    singleDayEvents,
    [workingHours],
  );
 
  const isScaled = hourHeight !== 96;
  const quarter = hourHeight / 4;

  const dayEvents = useMemo(() => singleDayEvents.filter((e) => {
    const date = dateParserIso(e.date, e.start_time);
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }), [singleDayEvents]);

  const groupedEvents = useMemo(() => groupEvents(dayEvents), [dayEvents]);
  
  const slot = (idx: number) => {
    if (!isScaled) return { className: STOCK_SLOT_CLASSES[idx], style: undefined };
    return {
      className: "absolute inset-x-0 cursor-pointer transition-colors hover:bg-accent",
      style: { top: `${quarter * idx}px`, height: `${quarter}px` },
    }
  }

  const getEventStyle = (event: IEvent, groupIndex: number) => {
    const style = getEventBlockStyle(event, new Date(selectedDate), groupIndex, groupedEvents.length, { from: earliest_event_hour, to: latest_event_hour });

    const hasOverlap = groupedEvents.some((g, i) =>
      i !== groupIndex && g.some(e => areIntervalsOverlapping(
        { start: dateParserIso(event.date, event.start_time), end: dateParserIso(event.date, event.end_time) },
        { start: dateParserIso(e.date, e.start_time), end: dateParserIso(e.date, e.end_time) },
      ),
    ));

    if (!hasOverlap) return { ...style, width: "100%", left: "0%" };

    return style;
  }

  const handleSlotClick = (date: Date, time: { hour: number, minute: number }) => {
    console.log(date, time);
  }

  return (
    <div className="flex">
      <div className="flex flex-1 flex-col">
        <div>

          <div className="relative z-20 flex border-b border-border">
            <div className="w-10"/>
            <span className="flex-1 py-2 text-center text-sm font-medium border-l border-border opacity-50">
              <span className="capitalize">{format(selectedDate, "EEEEEE", { locale: ru })}</span>{" "}
              <span className="font-bold text-foreground">{format(selectedDate, "d")}</span>
            </span>
          </div>
        </div>

        <div>
          <div className="flex">
            <div className="relative w-10">
              {hours.map((hour, index) => (
                <div key={hour} className="relative" style={{ height: `${hourHeight}px` }}>
                  <div className="absolute -top-3 right-2 flex h-6 items-center">
                    {index !== 0 && (
                      <span className="text-xs font-medium opacity-50">{hour}:00</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-1 border-l border-border relative">
              <div className="relative">
                {hours.map((hour, idx) => (
                  <div
                    key={hour}
                    className={cn("relative", classNames?.hourRow)}
                    style={{ height: `${hourHeight}px` }}
                  >
                    {idx !== 0 && <div className="pointer-events-none absolute inset-x-0 top-0 border-b border-border" />}
                    {[0, 15, 30, 45].map((minute, qIdx) => {
                      const start = hour * 60 + minute;
                      const end = start + 15;
                      const isDisabled = !isSlotWorking(start, end, workingHours.intervals);
                      

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
                            <div
                              {...slot(qIdx)}
                              onClick={() => handleSlotClick(selectedDate, { hour, minute })}
                            >
                              +{hour}:{minute === 0 ? "00" : minute}
                            </div>
                          )}
                        </Fragment>
                      );
                    })}
                  </div>
                ))}

                {groupedEvents.map((group, idx) => (
                  <div
                    key={`group-${idx}`}
                    style={{ display: 'contents' }}
                  >
                    {group.map((e) => (
                      <div
                        key={`group-day-${e.date}T${e.start_time}`}
                        className={"absolute"}
                        style={getEventStyle(e, idx)}
                      >
                        <CalendarEventBlock
                          event={e}
                          view={"day"}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {isToday(selectedDate) && <CalendarTimeline firstHour={earliest_event_hour} lastHour={latest_event_hour} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

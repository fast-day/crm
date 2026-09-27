import type { IEvent, TEventRenderView } from "../../model/types/event-calendar.type";
import { isMarkColor, useCalendarCustomization } from "../../model/utils/customization.util";
import { useMemo } from "react";
import { differenceInMinutes } from "date-fns";
import { cn } from "@/shared/utils";
import { dateParserIso } from "../../model/utils/formatter.util";
import { calendarItemVariant } from "../../model/variants/calendar-item.variant";
import { Avatar } from "@/entities/user";

interface ICalendarEventBlockProps {
  event: IEvent;
  className?: string;
  view?: TEventRenderView;
}

const MIN_EVENT_HEIGHT = 25;

export const CalendarEventBlock = ({ event, className, view="week" }: ICalendarEventBlockProps) => {
  const { renderEvent, selectedEventId, hourHeight, classNames } = useCalendarCustomization();

  const start = useMemo(() => dateParserIso(event.date, event.start_time), [event.date, event.start_time]);
  const end = useMemo(() => dateParserIso(event.date, event.end_time), [event.date, event.end_time]);
  const duration = useMemo(() => differenceInMinutes(end, start), [end, start]);
  const heightInPx = useMemo(() => Math.max((duration / 60) * hourHeight - 2, MIN_EVENT_HEIGHT), [duration, hourHeight]);

  const isMark = isMarkColor(event.mark);
  const selected = selectedEventId !== null && selectedEventId === event.id;
  const custom = !!renderEvent;

  const sizeStyle = custom && selected ? { minHeight: `${heightInPx}px` } : { height: `${heightInPx}px` }
  const colorStyle = isMark ? undefined : ({ backgroundColor: "bg-primary" } as React.CSSProperties);

  const defaultContent = (
    <div className="truncate w-full">
      <div className={cn(calendarItemVariant({ head: event.mark }), "px-2 h-6.25 flex items-center")}>
        <span className="text-xs font-medium">{event.start_time}-{event.end_time}</span>
      </div>
      <div className="w-full p-2">
        <div className="flex item gap-1">
          <Avatar size={"xs"} id={event.customer.id} name={event.customer.full_name} avatar_url={event.customer.avatar} />
          <p className="font-semibold">{event.customer.full_name}</p>
        </div>
        <p className="font-medium text-xs leading-4 mt-1.5">Услуга: {event.booking_services[0].service.name}</p>
      </div>
    </div>
  )

  return (
    <div
      role={"button"}
      tabIndex={0}
      data-event-id={event.id}
      data-selected={selected ? "" : undefined}
      className={cn(
        "flex gap-1.5 truncate whitespace-nowrap rounded-10 border text-sm",
        calendarItemVariant({ color: event.mark ?? "primary" }),
        duration < 35 && "p-0 justify-center",
        !isMark && "bg-primary",
        custom && selected && "relative z-10",
        classNames?.eventBlock,
        className,
      )}
      style={{ ...sizeStyle, ...colorStyle }}
    >{renderEvent ? renderEvent(event, { view, selected, badgeVariant: "colored", defaultContent }) : defaultContent}</div>
  )
}

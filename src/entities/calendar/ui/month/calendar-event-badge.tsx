import { cva } from "class-variance-authority";
import type { IEvent, TCalendarBadgePosition, TEventRenderView } from "../../model/types/event-calendar.type"
import { dateParserIso } from "../../model/utils/formatter.util";
import { isMarkColor, useCalendarCustomization } from "../../model/utils/customization.util";
import { endOfDay, isSameDay, startOfDay } from "date-fns";
import type React from "react";
import { cn } from "@/shared/utils";
import { memo } from "react";
import { Avatar } from "@/entities/user";

interface IMonthEventBadgeProps {
  event: IEvent;
  date: Date;
  eventCurrentDay?: number;
  eventTotalDays?: number;
  className?: string;
  position?: TCalendarBadgePosition;
  view?: TEventRenderView;
}

const variants = cva(undefined, {
  variants: {
    color: {
      red: "bg-red/30 text-red",
      orange: "bg-orange/30 text-orange",
      green: "bg-green/30 text-green",
      blue: "bg-blue/30 text-blue",
      purple: "bg-purple-500/30 text-purple-600",
      teal: "bg-teal-500/30 text-teal-700",
      pink: "bg-pink-500/30 text-pink-600",
      primary: "bg-primary/30 text-primary",
      gray: "bg-gray-500/30 text-gray-700",
    },
    head: {
      red: "bg-red text-white",
      orange: "bg-orange text-white",
      green: "bg-green text-white",
      blue: "bg-blue text-white",
      purple: "bg-purple-500 text-white",
      teal: "bg-teal-500 text-white",
      pink: "bg-pink-500 text-white",
      primary: "bg-primary text-white",
      gray: "bg-gray-500 text-white",
    },
    position: {
      first: "relative z-10 mr-0 w-[calc(100%_-_3px)] rounded-r-none border-r-0 [&>span]:mr-2.5",
      middle: "relative z-10 mx-0 w-[calc(100%_+_1px)] rounded-none border-x-0",
      last: "ml-0 rounded-l-none border-l-0",
      none: "",
    }
  },
  defaultVariants: {
    color: "primary",
  }
});

const MonthEventBadge = ({ event, date, eventCurrentDay, eventTotalDays, className, position, view="month" }: IMonthEventBadgeProps) => {
  const { renderEvent, renderMonthEvent, selectedEventId, classNames } = useCalendarCustomization();
  const renderer = renderMonthEvent ?? renderEvent;

  const getPosition = (): TCalendarBadgePosition => {
    if (position) return position;

    const start = startOfDay(dateParserIso(event.date, event.start_time));
    const end = endOfDay(dateParserIso(event.date, event.end_time));

    if (eventCurrentDay && eventTotalDays) return "none";
    if (isSameDay(start, end)) return 'none'
    if (isSameDay(date, start)) return 'first'
    if (isSameDay(date, end)) return 'last'
    return 'middle'
  }

  const isVisible = (): boolean => {
    const start = startOfDay(dateParserIso(event.date, event.start_time));
    const end = endOfDay(dateParserIso(event.date, event.end_time));
    return !(date < start || date > end);
  }

  if (!isVisible()) return null;

  const currentPosition = getPosition();
  const isMark = isMarkColor(event.mark);
  const selected = selectedEventId !== null && selectedEventId === event.id;
  const mark = isMark ? event.mark : undefined;

  const defaultContent = (
    <>
      <div className="truncate w-full">
        <div className={cn(variants({ head: event.mark }), "px-2")}>
          <span className="text-xs font-semibold">{event.start_time} - {event.end_time}</span>
        </div>
        <div className="border-t w-full px-2 py-0.5">
          <div className="flex item gap-1">
            <Avatar size={"xs"} id={event.customer.id} name={event.customer.full_name} avatar_url={event.customer.avatar} />

            <p className="font-semibold">{event.customer.full_name}</p>
          </div>
          <p className="font-medium text-xs">{event.booking_services[0].service.name}</p>
        </div>
      </div>
    </>
  );

  return (
    <div
      role={"button"}
      tabIndex={0}
      data-event-id={event.id}
      data-selected={selected ? "" : undefined}
      className={cn(
        "mx-1 flex items-center justify-between gap-1.5 truncate whitespace-nowrap rounded-md text-sm",
        variants({ color: mark, position: currentPosition }),
        classNames?.eventBlock,
        className,
      )}
      style={isMark ? undefined : ({ background: event.mark } as React.CSSProperties) }
    >
      {renderer ? renderer(event, { view, selected, badgeVariant: "colored", defaultContent }) : defaultContent}
    </div>
  )
}

export default memo(MonthEventBadge);

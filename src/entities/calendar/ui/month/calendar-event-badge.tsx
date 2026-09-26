import { cva } from "class-variance-authority";
import type { IEvent, TCalendarBadgePosition, TEventRenderView } from "../../model/types/event-calendar.type"
import { formatHour } from "../../model/utils/formatter.util";
import { ru } from "date-fns/locale";
import { isMarkColor, useCalendarCustomization } from "../../model/utils/customization.util";
import { endOfDay, isSameDay, parseISO, startOfDay } from "date-fns";
import type React from "react";
import { useCalendarLabels } from "../../model/utils/labels.util";
import { cn } from "@/shared/utils";
import { memo } from "react";

interface IMonthEventBadgeProps {
  event: IEvent;
  date: Date;
  eventCurrentDay?: number;
  eventTotalDays?: number;
  className?: string;
  position?: TCalendarBadgePosition;
  view?: TEventRenderView;
}

const variants = cva("mx-1 flex items-center justify-between gap-1.5 truncate whitespace-nowrap rounded-md border px-2 text-sm", {
  variants: {
    color: {
      red: "bg-red/30 text-red",
      orange: "bg-orange/30 text-orange",
      green: "bg-green/30 text-green",
      blue: "bg-blue/30 text-blue",
      purple: "bg-purple-500/30 text-purple",
      teal: "bg-teal-500/30 text-teal",
      pink: "bg-pink-500/30 text-pink",
      primary: "bg-primary/30 text-primary",
      gray: "bg-gray-500/30 text-gray",
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
})

const MonthEventBadge = ({ event, date, eventCurrentDay, eventTotalDays, className, position, view="month" }: IMonthEventBadgeProps) => {
  const labels = useCalendarLabels();
  const formatTime = formatHour(date, ru);
  const { renderEvent, renderMonthEvent, selectedEventId, classNames } = useCalendarCustomization();
  const renderer = renderMonthEvent ?? renderEvent;

  const getPosition = (): TCalendarBadgePosition => {
    if (position) return position;

    const start = startOfDay(parseISO(event.start_date));
    const end = endOfDay(parseISO(event.end_date));

    if (eventCurrentDay && eventTotalDays) return "none";
    if (isSameDay(start, end)) return 'none'
    if (isSameDay(date, start)) return 'first'
    if (isSameDay(date, end)) return 'last'
    return 'middle'
  }

  const isVisible = (): boolean => {
    const start = startOfDay(parseISO(event.start_date));
    const end = endOfDay(parseISO(event.end_date));
    return !(date < start || date > end);
  }

  if (!isVisible()) return null;

  const currentPosition = getPosition();
  const isMark = isMarkColor(event.mark);
  const selected = selectedEventId !== null && selectedEventId === event.id;
  const mark = isMark ? event.mark : undefined

  const defaultContent = (
    <>
      <div className="flex items-center gap-1.5 truncate">

        {['first', 'none'].includes(currentPosition) && (
          <p className="flex-1 truncate font-semibold">
            {eventCurrentDay && (
              <span className="text-xs">
                {labels.dayOfTotal(eventCurrentDay, eventTotalDays!)} &bull;&nbsp;
              </span>
            )}
            {event.title}
          </p>
        )}
      </div>

      {['first', 'none'].includes(currentPosition) && !event.is_all_day && (
        <span>{formatTime}</span>
      )}
    </>
  );

  return (
    <div
      role={"button"}
      tabIndex={0}
      data-event-id={event.id}
      data-selected={selected ? "" : undefined}
      className={cn(
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

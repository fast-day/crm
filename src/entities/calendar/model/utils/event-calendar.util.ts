import { addDays, addMonths, addWeeks, addYears, differenceInDays, differenceInMinutes, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isWithinInterval, parseISO, startOfDay, startOfMonth, startOfWeek, subDays, subMonths, subWeeks, subYears, type Locale } from "date-fns";
import type { ICalendarCell, IEvent, TCalendarView, TVisibleHours } from "../types/event-calendar.type";
import { dateParserIso } from "./formatter.util";
import type { ISchedule, IScheduleIntervals } from "@/entities/schedule";
import { ru } from "date-fns/locale";

export const getCalendarCells = (date: Date): ICalendarCell[] => {
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDate();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1);
  const totalDays = firstDayOfMonth + daysInMonth;

  const prevMonthCells = Array.from({ length: firstDayOfMonth }, (_, i) => ({
    day: daysInPrevMonth - firstDayOfMonth + i + 1,
    current_month: false,
    date: new Date(currentYear, currentMonth - 1, daysInPrevMonth - firstDayOfMonth + i + 1),
  }));

  const currentMonthCells = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    current_month: true,
    date: new Date(currentYear, currentMonth, i + 1),
  }));

  const nextMonthCells = Array.from({ length: (7 - (totalDays % 7)) % 7 }, (_, i) => ({
    day: i + 1,
    current_month: false,
    date: new Date(currentYear, currentMonth + 1, i + 1),
  }));

  return [...prevMonthCells, ...currentMonthCells, ...nextMonthCells];
}

export const rangeText = (date: Date, locale?: Locale) => {
  const opt = locale ? { locale } : undefined;
  return `${format(date, "YYYY-MM-dd", opt)}`;
}

export const navigateDate = (date: Date, view: TCalendarView, direction: "previous" | "next"): Date => {
  const operations = {
    year: direction === "next" ? addYears : subYears,
    month: direction === "next" ? addMonths : subMonths,
    week: direction === "next" ? addWeeks : subWeeks,
    day: direction === "next" ? addDays : subDays,
  }

  return operations[view](date, 1);
}

export const formatCalendarPeriod = (date: Date, view: TCalendarView): string | { primary: string; secondary: string } => {
  switch (view) {
    case "day":
      return {
        primary: format(date, "d MMM", { locale: ru }),
        secondary: format(date, "eeee", { locale: ru }),
      };

    case "week": {
      const start = startOfWeek(date, { weekStartsOn: 1 });
      const end = endOfWeek(date, { weekStartsOn: 1 });

      const startStr = format(start, "d MMM", { locale: ru });
      const endStr = format(end, "d MMM", { locale: ru });

      return `${startStr} – ${endStr}`;
    }

    case "month":
      return format(date, "LLLL yyyy", { locale: ru });

    case "year":
      return format(date, "yyyy", { locale: ru });

    default:
      return format(date, "d MMM yyyy", { locale: ru });
  }
}

export const getCurrentEvents = (events: IEvent[]) => {
  const now = new Date();
  return events.filter(e => isWithinInterval(now, { start: parseISO(`${e.date}T${e.start_time}`), end: parseISO(`${e.date}T${e.end_time}`) })) || null;
}

export const groupEvents = (dayEvents: IEvent[]) => {
  const sorted = dayEvents.sort((a, b) => dateParserIso(a.date, a.start_time).getTime() - parseISO(`${b.date}T${b.end_time}`).getTime());
  const groups: IEvent[][] = [];

  for (const event of sorted) {
    const eventStart = dateParserIso(event.date, event.start_time);
    let placed = false;

    for (const group of groups) {
      const lastEventInGroup = group[group.length - 1]!;
      const lastEventEnd = parseISO(`${lastEventInGroup.date}T${lastEventInGroup.end_time}`);

      if (eventStart >= lastEventEnd) {
        group.push(event);
        placed = true;
        break;
      }
    }

    if (!placed) groups.push([event]);
  }

  return groups;
}

export const getEventBlockStyle = (event: IEvent, day: Date, groupIndex: number, groupSize: number, visibleHoursRange?: { from: number; to: number }) => {
  const startDate = dateParserIso(event.date, event.start_time);
  const dayStart = new Date(day.setHours(0, 0, 0, 0));
  const eventStart = startDate < dayStart ? dayStart : startDate;
  const startMinutes = differenceInMinutes(eventStart, dayStart);

  let top;

  if (visibleHoursRange) {
    const visibleStartMinutes = visibleHoursRange.from * 60;
    const visibleEndMinutes = visibleHoursRange.to * 60;
    const visibleRangeMinutes = visibleEndMinutes - visibleStartMinutes;
    top = ((startMinutes - visibleStartMinutes) / visibleRangeMinutes) * 100;
  } else {
    top = (startMinutes / 1440) * 100;
  }

  const width = 100 / groupSize;
  const left = groupIndex * width;

  return { top: `${top}%`, width: `${width}%`, left: `${left}%` };
}

export const isWorkingSlot = (start: number, end: number, intervals: IScheduleIntervals[]) => {
  return intervals.some(interval => {
    const intervalStart = timeToMinutes(interval.start);
    const intervalEnd = timeToMinutes(interval.end);

    return (start >= intervalStart && end <= intervalEnd);
  });
};

export const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
};

export const isSlotWorking = (startMinutes: number, endMinutes: number, intervals: IScheduleIntervals[]) => {
  return intervals.some(interval => {
    const intervalStart = timeToMinutes(interval.start);
    const intervalEnd = timeToMinutes(interval.end);

    return (startMinutes >= intervalStart && endMinutes <= intervalEnd);
  });
};

export const getWorkingDay = (day: Date, workingHours: ISchedule[]) => {
  return workingHours.find(el => isSameDay(new Date(`${el.date}T00:00:00`), day));
};

export const getVisibleHours = (visibleHours: TVisibleHours, singleDayEvents: IEvent[]) => {
  let earliestEventHour = visibleHours.from;
  let latestEventHour = visibleHours.to;

  singleDayEvents.forEach(event => {
    const startHour = dateParserIso(event.date, event.start_time).getHours();
    const endTime = dateParserIso(event.date, event.end_time);
    const endHour = endTime.getHours() + (endTime.getMinutes() > 0 ? 1 : 0);
    if (startHour < earliestEventHour) earliestEventHour = startHour;
    if (endHour > latestEventHour) latestEventHour = endHour;
  })

  latestEventHour = Math.min(latestEventHour, 24);

  const hours = Array.from({ length: latestEventHour - earliestEventHour }, (_, i) => i + earliestEventHour);

  return { hours, earliest_event_hour: earliestEventHour, latest_event_hour: latestEventHour };
}

export const calculateMonthEventPositions = (multiDayEvents: IEvent[], singleDayEvents: IEvent[], selectedDate: Date, maxVisible = 4) => {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);

  const eventPositions: { [key: string]: number } = {};
  const occupiedPositions: { [key: string]: boolean[] } = {};

  eachDayOfInterval({ start: monthStart, end: monthEnd }).forEach(day => {
    occupiedPositions[day.toISOString()] = Array.from({ length: maxVisible }, () => false);
  });

  const sortedEvents = [
    ...multiDayEvents.sort((a, b) => {
      const aDuration = differenceInDays(dateParserIso(a.date, a.end_time), dateParserIso(a.date, a.start_time));
      const bDuration = differenceInDays(dateParserIso(b.date, b.end_time), dateParserIso(b.date, b.start_time));
      return bDuration - aDuration || (dateParserIso(a.date, a.start_time)).getTime() - dateParserIso(b.date, b.start_time).getTime();
    }),
    ...singleDayEvents.sort((a, b) => dateParserIso(a.date, a.start_time).getTime() - dateParserIso(b.date, b.start_time).getTime()),
  ]

  sortedEvents.forEach(event => {
    const eventStart = dateParserIso(event.date, event.start_time);
    const eventEnd = dateParserIso(event.date, event.end_time);
    const eventDays = eachDayOfInterval({
      start: eventStart < monthStart ? monthStart : eventStart,
      end: eventEnd > monthEnd ? monthEnd : eventEnd,
    });

    let position = -1;

    for (let i = 0; i < maxVisible; i++) {
      if (
        eventDays.every(day => {
          const dayPositions = occupiedPositions[startOfDay(day).toISOString()];
          return dayPositions && !dayPositions[i];
        })
      ) {
        position = i;
        break;
      }
    }

    if (position !== -1) {
      eventDays.forEach(day => {
        const dayKey = startOfDay(day).toISOString();
        occupiedPositions[dayKey]![position] = true;
      })
      eventPositions[event.id] = position;
    }
  })

  return eventPositions;
}


export const getMonthCellEvents = (date: Date, events: IEvent[], eventPositions: Record<string, number>) => {
  const eventsForDate = events.filter(event => {
    const eventStart = dateParserIso(event.date, event.start_time);
    const eventEnd = dateParserIso(event.date, event.end_time);
    return (date >= eventStart && date <= eventEnd) || isSameDay(date, eventStart) || isSameDay(date, eventEnd);
  });

  return eventsForDate
    .map(event => ({ ...event, position: eventPositions[event.id] ?? -1, isMultiDay: !isSameDay(dateParserIso(event.date, event.start_time), dateParserIso(event.date, event.end_time)) || !!event.is_all_day, }))
    .sort((a, b) => {
      if (a.isMultiDay && !b.isMultiDay) return -1;
      if (!a.isMultiDay && b.isMultiDay) return 1;
      return a.position - b.position;
    });
}
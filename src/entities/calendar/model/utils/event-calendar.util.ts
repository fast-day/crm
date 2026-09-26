import { addDays, addMonths, addWeeks, addYears, differenceInDays, differenceInMinutes, eachDayOfInterval, endOfMonth, format, isSameDay, isWithinInterval, parseISO, startOfDay, startOfMonth, subDays, subMonths, subWeeks, subYears, type Locale } from "date-fns";
import type { ICalendarCell, IEvent, TCalendarView, TVisibleHours, TWorkingHours } from "../types/event-calendar.type";

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

export const getCurrentEvents = (events: IEvent[]) => {
  const now = new Date();
  return events.filter(e => isWithinInterval(now, { start: parseISO(e.start_date), end: parseISO(e.end_date) })) || null;
}

export const groupEvents = (dayEvents: IEvent[]) => {
  const sorted = dayEvents.sort((a, b) => parseISO(a.start_date).getTime() - parseISO(b.end_date).getTime());
  const groups: IEvent[][] = [];

  for (const event of sorted) {
    const eventStart = parseISO(event.start_date);
    let placed = false;

    for (const group of groups) {
      const lastEventInGroup = group[group.length - 1]!;
      const lastEventEnd = parseISO(lastEventInGroup.end_date);

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
  const startDate = parseISO(event.start_date);
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

export const isWorkingHour = (day: Date, hour: number, workingHours: TWorkingHours) => {
  const dayIndex = day.getDay() as keyof typeof workingHours;
  const dayHours = workingHours[dayIndex]!;
  return hour >= dayHours.from && hour < dayHours.to;
}

export const getVisibleHours = (visibleHours: TVisibleHours, singleDayEvents: IEvent[]) => {
  let earliestEventHour = visibleHours.from;
  let latestEventHour = visibleHours.to;

  singleDayEvents.forEach(event => {
    const startHour = parseISO(event.start_date).getHours();
    const endTime = parseISO(event.end_date);
    const endHour = endTime.getHours() + (endTime.getMinutes() > 0 ? 1 : 0);
    if (startHour < earliestEventHour) earliestEventHour = startHour;
    if (endHour > latestEventHour) latestEventHour = endHour;
  })

  latestEventHour = Math.min(latestEventHour, 24);

  const hours = Array.from({ length: latestEventHour - earliestEventHour }, (_, i) => i + earliestEventHour);

  return { hours, earliest_event_hour: earliestEventHour, latest_event_hour: latestEventHour };
}

export const calculateMonthEventPositions = (multiDayEvents: IEvent[], singleDayEvents: IEvent[], selectedDate: Date, maxVisible = 3) => {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);

  const eventPositions: { [key: string]: number } = {};
  const occupiedPositions: { [key: string]: boolean[] } = {};

  eachDayOfInterval({ start: monthStart, end: monthEnd }).forEach(day => {
    occupiedPositions[day.toISOString()] = Array.from({ length: maxVisible }, () => false);
  });

  const sortedEvents = [
    ...multiDayEvents.sort((a, b) => {
      const aDuration = differenceInDays(parseISO(a.end_date), parseISO(a.start_date));
      const bDuration = differenceInDays(parseISO(b.end_date), parseISO(b.start_date));
      return bDuration - aDuration || parseISO(a.start_date).getTime() - parseISO(b.start_date).getTime();
    }),
    ...singleDayEvents.sort((a, b) => parseISO(a.start_date).getTime() - parseISO(b.start_date).getTime()),
  ]

  sortedEvents.forEach(event => {
    const eventStart = parseISO(event.start_date);
    const eventEnd = parseISO(event.end_date);
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
    const eventStart = parseISO(event.start_date);
    const eventEnd = parseISO(event.end_date);
    return (date >= eventStart && date <= eventEnd) || isSameDay(date, eventStart) || isSameDay(date, eventEnd);
  });

  return eventsForDate
    .map(event => ({ ...event, position: eventPositions[event.id] ?? -1, isMultiDay: !isSameDay(parseISO(event.start_date), parseISO(event.end_date)) || !!event.is_all_day, }))
    .sort((a, b) => {
      if (a.isMultiDay && !b.isMultiDay) return -1;
      if (!a.isMultiDay && b.isMultiDay) return 1;
      return a.position - b.position;
    });
}
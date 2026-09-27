import { useMemo } from "react";
import type { IEvent, TVisibleHours } from "../types/event-calendar.type";
import { getVisibleHours, timeToMinutes } from "../utils/event-calendar.util";
import type { ISchedule } from "@/entities/schedule";

export const useCalendarVisibleHours = (
  hours: TVisibleHours,
  singleDay: IEvent[],
  workingHours: ISchedule[],
) => {
  const visible = useMemo(() => {
    const workingBounds = workingHours.reduce(
      (acc, schedule) => {
        schedule.intervals.forEach(interval => {
          const startHour = Math.floor(timeToMinutes(interval.start) / 60);
          const endHour = Math.ceil(timeToMinutes(interval.end) / 60);
          acc.from = Math.min(acc.from, startHour);
          acc.to = Math.max(acc.to, endHour);
        });
        return acc;
      },
      { from: hours.from, to: hours.to },
    );

    return getVisibleHours(workingBounds, singleDay);
  }, [hours, singleDay, workingHours]);

  return visible;
};

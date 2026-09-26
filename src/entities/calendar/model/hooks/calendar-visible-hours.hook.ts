import { useMemo } from "react";
import type { IEvent, TVisibleHours } from "../types/event-calendar.type";
import { getVisibleHours } from "../utils/event-calendar.util";

export const useCalendarVisibleHours = (hours: TVisibleHours, singleDay: IEvent[]) => {
  const visible = useMemo(() => getVisibleHours(hours, singleDay), [hours, singleDay]);

  return visible;
}

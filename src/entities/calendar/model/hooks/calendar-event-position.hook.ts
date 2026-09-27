import { useMemo } from "react";
import type { IEvent } from "../types/event-calendar.type";
import { calculateMonthEventPositions } from "../utils/event-calendar.util";

export const useCalendarEventPosition = (multiDay: IEvent[], singleDay: IEvent[], date: Date, maxVisible = 4) => {
  const event_positions = useMemo(() => 
    calculateMonthEventPositions(multiDay, singleDay, date, maxVisible),
  [multiDay, singleDay, date, maxVisible]);

  return { event_positions };
}

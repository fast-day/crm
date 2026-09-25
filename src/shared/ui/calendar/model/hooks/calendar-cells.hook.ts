import { useMemo } from "react"
import { getCalendarCells } from "../utils/event-calendar.util"
import type { ICalendarCell } from "../types/event-calendar.type";

export const useCalendarCells = (date: Date): { cells: ICalendarCell[]; } => {
  const cells = useMemo(() => getCalendarCells(date), [date]);
  return { cells };
}

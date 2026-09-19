import { useState } from "react"
import type { CalendarViewMode } from "../types/calendar.type";

export const useCalendarView = () => {
  const [mode, setMode] = useState<CalendarViewMode>("month");
  const [anchorDate, setAnchorDate] = useState(new Date());

  return { mode, setMode, anchorDate, setAnchorDate };
}

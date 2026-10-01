import { useState } from "react"
import type { CalendarViewMode } from "../types/calendar.type";
import { useMediaQuery } from "react-responsive";

export const useCalendarView = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [mode, setMode] = useState<CalendarViewMode>("month");

  const effectiveMode: CalendarViewMode = isMobile && mode === "week" ? "day" : mode;

  return { mode, setMode, effectiveMode, isMobile };
}

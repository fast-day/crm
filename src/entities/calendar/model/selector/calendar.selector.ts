import type { RootState } from "@/app/providers/redux/config";

export const calendarSelector = (s: RootState) => s.calendar;

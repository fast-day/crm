import type { IScheduleIntervals } from "@/entities/schedule";

export type ParsedBackendDate = {
  day: number;
  monthIndex: number;
  year: number;
}

export type DayInfo =
  | { kind: "weekend", intervals: null, }
  | {
  extraCount: number;
  intervals: IScheduleIntervals[];
  kind: "work" | "weekend";
  totalCount: number;
}


export type ScheduleEditInfo = {
  scheduleId: number;
  workIntervals: Array<{ start: string; end: string }>;
}

export type CalendarCell = {
  inMonth: boolean;
  day: number;
  dateKey: string;
  year: number;
  monthIndex: number;
}

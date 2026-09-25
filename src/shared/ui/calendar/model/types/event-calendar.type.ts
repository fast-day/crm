import type { ICustomer } from "@/entities/customers";

export type TCalendarView = "day" | "week" | "month" | "year";
export type TWorkingHours = {
  [key: number]: {
    from: number;
    to: number;
  }
}
export type TVisibleHours = { from: number; to: number };

export interface ICalendarCell {
  day: number;
  current_month: boolean;
  date: Date;
}

export interface IEvent<M = unknown> {
  id: string;
  start_date: string;
  end_date: string;
  title: string;
  description?: string;
  mark: MarkType;
  customers: ICustomer;
  is_all_day?: boolean;
  meta?: M;
}

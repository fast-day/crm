import type { TVisibleHours } from "../types/event-calendar.type";

export const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] as const;

export const DEFAULT_VISIBLE_HOURS: TVisibleHours = { from: 8, to: 19 };

export const STOCK_SLOT_CLASSES = [
  "absolute inset-x-0 top-0 h-[24px] cursor-pointer transition-colors hover:bg-primary/80 hover:opacity-100 opacity-0 flex items-center justify-center text-white text-xs",
  "absolute inset-x-0 top-[24px] h-[24px] cursor-pointer transition-colors hover:bg-primary/80 hover:opacity-100 opacity-0 flex items-center justify-center text-white text-xs",
  "absolute inset-x-0 top-[48px] h-[24px] cursor-pointer transition-colors hover:bg-primary/80 hover:opacity-100 opacity-0 flex items-center justify-center text-white text-xs",
  "absolute inset-x-0 top-[72px] h-[24px] cursor-pointer transition-colors hover:bg-primary/80 hover:opacity-100 opacity-0 flex items-center justify-center text-white text-xs",
];

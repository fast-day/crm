import type { TVisibleHours } from "../types/event-calendar.type";

export const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] as const;

export const DEFAULT_VISIBLE_HOURS: TVisibleHours = { from: 8, to: 19 };

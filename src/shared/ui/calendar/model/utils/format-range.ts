import { MONTH_NAMES, MONTH_SHORT } from "@/shared/constants/month.constant";
import { endOfMonth, format, isSameDay, isSameMonth, isSameYear, startOfMonth, } from "date-fns";
import type { DateRange } from "react-day-picker";

const formatMonth = (date: Date) => {
  return MONTH_SHORT[date.getMonth()];
};

const formatDateRange = (range: DateRange | undefined) => {
  if (!range?.from || !range?.to) return "Дата";

  const { from, to } = range;

  const currentYear = new Date().getFullYear();

  const isFullMonth =
    isSameMonth(from, to) &&
    isSameDay(from, startOfMonth(from)) &&
    isSameDay(to, endOfMonth(to));

  if (isFullMonth && from.getFullYear() === currentYear) {
    return MONTH_NAMES[(from.getMonth())];
  }

  if (isFullMonth) {
    return `${MONTH_NAMES[(from.getMonth())]} ${format(from, "yyyy")}`;
  }

  if (isSameYear(from, to)) {
    const year = from.getFullYear() === currentYear ? "" : ` ${format(from, "yyyy")}`;

    return `${format(from, "d")} ${formatMonth(from)} – ${format(to, "d")} ${formatMonth(to)}${year}`;
  }

  return `${format(from, "d")} ${formatMonth(from)} ${format(from, "yyyy")} – ${format(to, "d")} ${formatMonth(to)} ${format(to, "yyyy")}`;
}

export { formatDateRange };
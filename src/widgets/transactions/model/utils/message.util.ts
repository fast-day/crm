import type { TransactionType } from "@/entities/transactions";
import { endOfMonth, format, isSameDay, isSameMonth, isSameYear, parseISO, startOfMonth } from "date-fns";
import { ru } from "date-fns/locale";

const MONTHS_PREPOSITIONAL = [
  "январе", "феврале", "марте", "апреле", "мае", "июне",
  "июле", "августе", "сентябре", "октябре", "ноябре", "декабре",
];

const formatTransactionDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();

  const pattern = isSameYear(date, now) ? "d MMMM" : "d MMMM yyyy'г.'";

  return format(date, pattern, { locale: ru });
}

const TYPE_LABELS: Record<TransactionType, string> = {
  earning: "заработали",
  refund_deduction: "сделали возврат на сумму",
  expense: "потратили",
};

export const transactionMessage = (type: TransactionType | "all", date: { start_date: string, end_date: string }): string => {
  const message = type === "all" ? "прошло операций на сумму" : TYPE_LABELS[type];

  const start = parseISO(date.start_date);

  const isFullMonth =
    isSameMonth(date.start_date, date.end_date) &&
    isSameDay(date.start_date, startOfMonth(date.start_date)) &&
    isSameDay(date.end_date, endOfMonth(date.end_date));

  const period = isFullMonth
    ? isSameMonth(start, new Date())
      ? "В этом месяце"
      : `В ${MONTHS_PREPOSITIONAL[start.getMonth()]}${isSameYear(start, new Date()) ? "" : ` ${start.getFullYear()}`}`
    : `С ${formatTransactionDate(date.start_date)} по ${formatTransactionDate(date.end_date)}`;

  const subj = type === "all" ? "" : "вы";
  return `${period} ${subj} ${message}`;
}

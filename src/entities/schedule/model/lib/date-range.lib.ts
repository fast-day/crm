import { format } from "date-fns";
import { ru } from "date-fns/locale";

const parseKey = (key: string) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};


export const pluralizeDays = (n: number): string => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} день`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} дня`;
  return `${n} дней`;
};

export const formatDates = (keys: string[] = []) =>
  [...keys]
    .sort((a, b) => parseKey(a).getTime() - parseKey(b).getTime())
    .map((key) => ({ key, label: format(parseKey(key), "d MMMM", { locale: ru }) }));

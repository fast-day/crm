export type PresetValue = "all" | "even" | "odd" | "workdays" | "weekends";

type PresetCell = { day: number; year: number; monthIndex: number };

const isWeekend = ({ year, monthIndex, day }: PresetCell) => {
  const wd = new Date(year, monthIndex, day).getDay();
  return wd === 0 || wd === 6;
}

export const PRESETS: { value: PresetValue; label: string; test: (c: PresetCell) => boolean }[] = [
  { value: "all",      label: "Выбрать все",             test: () => true },
  { value: "even",     label: "Выбрать чётные",          test: (c) => c.day % 2 === 0 },
  { value: "odd",      label: "Выбрать нечётные",        test: (c) => c.day % 2 === 1 },
  { value: "workdays", label: "Выбрать рабочие дни",     test: (c) => !isWeekend(c) },
  { value: "weekends", label: "Выбрать выходные дни",    test: (c) => isWeekend(c) },
];


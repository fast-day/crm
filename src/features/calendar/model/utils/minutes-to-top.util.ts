import { PX_PER_MINUTE, START_HOUR } from "../constants/timeline.constant"

export const minutesToTop = (h: number, m: number): number => {
  const totalMin = (h - START_HOUR) * 60 + m;
  return totalMin * PX_PER_MINUTE;
}

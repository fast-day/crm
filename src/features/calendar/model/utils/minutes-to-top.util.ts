import { PX_PER_MINUTE, START_HOUR } from "../constants/timeline.constant";

export const parseTimeToMinutes = (time: string): number => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export const minutesToTop = (totalMinutes: number): number => {
  return (totalMinutes - START_HOUR * 60) * PX_PER_MINUTE;
}

import { type DayInfo } from "@/features/calendar";
import { PX_PER_MINUTE, START_HOUR, TIMELINE_HEIGHT } from "@/features/calendar/model/constants/timeline.constant";
import { CurrentTimeLine } from "./current-time-line";

export interface ITimelineDayColumnProps {
  date: Date;
  dayInfo?: DayInfo;
  isToday: boolean;
}

function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

const minutesToTop = (totalMinutes: number): number => {
  return (totalMinutes - START_HOUR * 60) * PX_PER_MINUTE;
}

export const TimelineDayCol = ({ dayInfo, isToday }: ITimelineDayColumnProps) => {
  return (
    <div className="relative flex" style={{ height: TIMELINE_HEIGHT }}>
      {dayInfo?.kind === "work" &&
        dayInfo.intervals.map((interval, idx) => (
          <div
            key={idx}
            className="absolute left-0 right-0 bg-primary/5"
            style={{
              top: minutesToTop(parseTimeToMinutes(interval.start)),
              height: minutesToTop(parseTimeToMinutes(interval.end)) - minutesToTop(parseTimeToMinutes(interval.start)),
            }}
          />
        ))}

      {isToday && <CurrentTimeLine />}
    </div>
  )
}

import { minutesToTop } from "@/features/calendar";
import { END_HOUR, START_HOUR, TIMELINE_HEIGHT } from "@/features/calendar/model/constants/timeline.constant"

export const TimelineAxis = () => {
  const hours = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);

  return (
    <div className={"relative w-16 shrink-0"} style={{ height: TIMELINE_HEIGHT }}>
      {hours.map(h => (
        <div
          key={h}
          className={"absolute left-0 text-sm text-accent/50 -translate-y-1/2"}
          style={{ top: minutesToTop(h, 0) }}
        >{String(h).padStart(2, "0")}:00</div>
      ))}
    </div>
  )
}

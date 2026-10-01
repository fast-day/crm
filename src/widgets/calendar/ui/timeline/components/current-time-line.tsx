import { minutesToTop } from "@/features/calendar";
import { useEffect, useState } from "react"

export const CurrentTimeLine = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const top = minutesToTop(now.getHours() * 60 + now.getMinutes());

  return (
    <div className="absolute left-0 right-0 z-20 pointer-events-none" style={{ top }}>
      <div className="h-10 w-10 bg-red relative">
        <div className="absolute -left-1 -top-1 w-2 h-2 rounded-full bg-red" />
      </div>
    </div>
  )
}

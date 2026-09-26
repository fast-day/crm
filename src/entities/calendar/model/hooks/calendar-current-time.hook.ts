import { useEffect, useState } from "react"

export const useCalendarCurrentTime = (): { current: Date; } => {
  const [current, setCurrent] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrent(new Date()), 60_000);

    return () => clearInterval(timer);
  }, []);

  return { current };
}

import { Button } from "@/shared/ui";
import type { TCalendarView } from "../../model/types/event-calendar.type"
import { ListIcon, SplitIcon, StackedIcon } from "@/shared/icons";
import { cn } from "@/shared/utils";
import { Link } from "@tanstack/react-router";

interface ICalendarHeaderProps {
  view: TCalendarView;
  onViewChange?: (v: TCalendarView) => void;
}

const views: Exclude<TCalendarView, "month" | "year">[] = ["day", "week"];

const VIEWS_ICON: Record<Exclude<TCalendarView, "month" | "year">, React.ComponentType> = {
  day: StackedIcon,
  week: SplitIcon,
}

export const CalendarHeader = ({ view, onViewChange }: ICalendarHeaderProps) => {
  return (
    <div>
      <div className="flex items-center gap-2.5 py-2">
        <Link to={"/bookings/list"}>        
          <Button variant={"white"} size={"icon_42"}>
            <ListIcon width={22} height={22} />
          </Button>
        </Link>
        {views.map((v) => (
          <Button
            key={v}
            variant={"white"}
            size={"icon_40"}
            className={cn(v === view && "bg-primary text-white")}
            onClick={() => onViewChange?.(v)}
          >
            {(() => {
              const Icon = VIEWS_ICON[v];
              return <span className="[&_svg]:w-5.5 [&_svg]:h-5.5"><Icon /></span>
            })()}
          </Button>
        ))}
      </div>
    </div>
  )
}

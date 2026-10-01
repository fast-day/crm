import { Route } from "@/app/routes/_app/_layout/bookings/list";
import type { IBookingQuery } from "@/entities/booking"
import type { TCalendarView } from "@/entities/calendar";
import { BookingStatusSort } from "@/features/booking";
import { ListIcon, SplitIcon, StackedIcon } from "@/shared/icons";
import { Button, SortWrapper } from "@/shared/ui";
import { Link, useNavigate } from "@tanstack/react-router";

const views: Exclude<TCalendarView, "month" | "year">[] = ["day", "week"];

const VIEWS_ICON: Record<Exclude<TCalendarView, "month" | "year">, React.ComponentType> = {
  day: StackedIcon,
  week: SplitIcon,
}

export const BookingSort = ({ status }: IBookingQuery) => {
  const navigate = useNavigate({ from: Route.fullPath });
  
  const handleChange = (name: "status", value: BookingStatusType | "all" ) => {
    navigate({
      search: (p: IBookingQuery) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [name]: _, ...rest } = p;
        return value === "all" ? { ...rest } : { ...rest, [name]: value, page: 1 };
      }
    });
  }

  const onViewChange = (v: TCalendarView) => localStorage.setItem("booking_calendar_view", v);

  return (
    <div>
      <div className="flex md:items-center justify-between md:flex-row flex-col-reverse gap-2.5 md:gap-5">
        <SortWrapper>
          <BookingStatusSort status={status} handleChange={handleChange} />
        </SortWrapper>

        <div className="flex items-center justify-end gap-2.5 py-2">
          <Button
            variant={"white"}
            size={"icon_42"}
            animation={"toggle"}
            className="bg-primary text-white"
          >
            <ListIcon width={20} height={20} />
          </Button>
          {views.map((v) => (
            <Link key={v} to={"/bookings/calendar"}>        
              <Button
                type={"button"}
                variant={"white"}
                size={"icon_40"}
                animation={"toggle"}
                onClick={() => onViewChange(v)}
                >
                {(() => {
                  const Icon = VIEWS_ICON[v];
                  return <span className="[&_svg]:w-5 [&_svg]:h-5"><Icon /></span>
                })()}
              </Button>
            </Link>
          ))}
        </div>

        {/* <Search
          placeholder={"Поиск по имени и номеру телефона"}
          value={searchValue}
          onValueChange={setSearchValue}
        /> */}
      </div>
    </div>
  )
}

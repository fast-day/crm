import { Route } from "@/app/routes/_app/_layout/bookings";
import type { IBookingQuery } from "@/entities/booking"
import { BookingStatusSort } from "@/features/booking";
import { SortWrapper } from "@/widgets/sort";
import { useNavigate } from "@tanstack/react-router";

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

  return (
    <div>
      <div className="flex items-center justify-between">
        <SortWrapper>
          <BookingStatusSort status={status} handleChange={handleChange} />
        </SortWrapper>

        {/* <Search
          placeholder={"Поиск по имени и номеру телефона"}
          value={searchValue}
          onValueChange={setSearchValue}
        /> */}
      </div>
    </div>
  )
}

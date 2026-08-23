import { Route } from "@/app/routes/_app/_layout-focus/customers/$customer_id/bookings";
import type { IBookingQuery } from "@/entities/booking"
import { BookingStatusSort } from "@/features/booking";
import { SortWrapper } from "@/widgets/sort";
import { useNavigate } from "@tanstack/react-router";

export const CustomerBookingSort = ({ status }: IBookingQuery) => {
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
      <SortWrapper>
        <BookingStatusSort status={status} handleChange={handleChange} />
      </SortWrapper>
    </div>
  )
}

import { useMediaQuery } from "react-responsive";
import type { BookingTableProps } from "./table/types/props.type";
import { BookingTableMobile } from "./table/booking-table-mobile";
import { BookingTableDesktop } from "./table/booking-table-desktop";

export const BookingTable = ({ bookings, isFetching }: BookingTableProps) => {
  const isTablet = useMediaQuery({ query: "(max-width: 1100px)" });

  return (
    <>
      {isTablet ?
        <BookingTableMobile isFetching={isFetching} bookings={bookings} />
        :
        <BookingTableDesktop isFetching={isFetching} bookings={bookings} />
      }
    </>
  )
}

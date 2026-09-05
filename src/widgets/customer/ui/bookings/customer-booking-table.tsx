import { useMediaQuery } from "react-responsive";
import { CustomerBookingTableDesktop } from "./table/customer-booking-table-desktop";
import { CustomerBookingTableMobile } from "./table/customer-booking-table-mobile";
import type { CustomerBookingTableProps } from "./table/types/props.type";

export const CustomerBookingTable = ({ bookings, isFetching }: CustomerBookingTableProps) => {
  const isTablet = useMediaQuery({ query: "(max-width: 1100px)" });

  return (
    <>
      {isTablet ?
        <CustomerBookingTableMobile isFetching={isFetching} bookings={bookings} />
        :
        <CustomerBookingTableDesktop isFetching={isFetching} bookings={bookings} />
      }
    </>
  )
}
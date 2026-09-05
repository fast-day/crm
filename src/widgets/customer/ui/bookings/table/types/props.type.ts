import type { ICustomerBooking } from "@/entities/customers";

export interface CustomerBookingTableProps {
  bookings: ICustomerBooking[];
  isFetching: boolean;
}

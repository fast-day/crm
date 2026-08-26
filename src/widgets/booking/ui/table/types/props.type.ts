import type { IBooking } from "@/entities/booking";

export interface BookingTableProps {
  bookings?: IBooking[];
  isFetching: boolean;
  profileId?: string;
}
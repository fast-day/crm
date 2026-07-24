import type { CustomerProfile } from "@/entities/customers";

export interface IDirectoryCustomer {
  id: string;
  customer_attributes: CustomerProfile & {
    profile_id: string;
    birthday: string | null;
    email: string | null;
  };
  visit_total: number;
  bookings_count: number;
  bookings_total: number;
}

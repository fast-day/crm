import type { IBookingQuery } from "@/entities/booking";

export type CustomerProfile = {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string | null;
  phone: string;
  avatar: string | null;
  birthday: string | null;
}

export interface ICustomers extends CustomerProfile {
  is_banned: boolean;
}

export type CustomerSortType = "newest" | "oldest";

export interface ICustomerQuery extends PaginationQuery {
  search?: string;
  sort?: CustomerSortType;
}

export interface ICustomer {
  id: string;
  note: string;
  is_banned: boolean;
  booking_count: number;
  documents_count: number;
  profile: CustomerProfile & {
    id: string;
    email: string;
  }
}

export interface ICustomerDetailCredentials extends IBookingQuery {
  customer_id: string;
}

export interface ICustomerCreateCredentials {
  first_name: string;
  last_name?: string;
  phone: string;
  note?: string | null;
  is_banned?: boolean;
}

export interface ICheckCustomer {
  exists: boolean;
  search_value: string;
  customer_id: string | null;
  profile: {
    id: string | null;
    first_name: string | null;
    last_name: string | null;
    full_name: string | null;
    avatar: string | null;
    phone: string | null;
  };
}
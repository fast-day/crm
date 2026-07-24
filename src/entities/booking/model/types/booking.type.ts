import type { CustomerProfile } from "@/entities/customers";
import type { ILocationAddress } from "@/entities/location";
import type { ServicePrices } from "@/entities/services";

export interface IBookingCustomer {
  id: string;
  full_name: string;
  first_name: string;
  profile_id: string;
  last_name: string | null;
  phone: string;
  email: string | null;
  avatar: string | null;
  birthday: string | null;
}

export interface IBookingEmployee {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string | null;
  phone: string;
  position: string;
  avatar: string | null;
}

export type BookingServicePriceType = {
  price: number;
  cost_price: number | null;
}

export type BookingServiceType = {
  id: string;
  name: string;
  public_name: string;
  mark: MarkType;
  avatar: string | null;
  duration: number;
  prices: BookingServicePriceType;
  category: string | null;
}

export interface IBookingOrder {
  id: string;
  status: OrderStatusType;
  subtotal: number;
  total: number;
  comment: string | null;
  discount: number | null;
  paid_at: boolean | null;
  tag: string;
  payment_method: PaymentMethodType;
}

export interface IBookingLocation {
  id: string;
  name: string;
  avatar: string | null;
  address: ILocationAddress;
}

export interface IBookingQuery extends PaginationQuery {
  customer?: string;
  employee?: string;
  service?: string;
  tag?: string;
  status?: BookingStatusType;
  sort?: SortType;
}

export interface IBookingCredentials extends IBookingQuery {
  location_id: string;
}

export interface IBookingServiceType {
  service_id: string;
  name: string;
  mark: MarkType;
  duration: number;
  avatar: string | null;
  category: string;
  prices: ServicePrices;
}

export interface IBookingUserType {
  user_id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  avatar: string | null;
}

export interface IBookingService {
  booking_service_id: string;
  booking_service_start_time: Date;
  booking_service_end_time: Date;
  booking_service_duration: number;
  booking_service_price: number;
  booking_service_count: number;
  service: IBookingServiceType;
  user: IBookingUserType;
}

export interface IBooking {
  id: string;
  status: BookingStatusType;
  tag: string;
  comment: string | null;
  subtotal: number | null;
  payment_method: PaymentMethodType | null;
  order_id: string | null;
  customer: Omit<CustomerProfile, "birthday">;
  booking_services: IBookingService[];
}

export interface IBookingDetail extends Omit<IBooking, "payment_method" | "subtotal" | "order_id" | "customer"> {
  order: IBookingOrder | null;
  customer: CustomerProfile & {
    profile_id: string | null;
    email: string | null;
  }
}

export interface IBookingServiceActionCredentials {
  service_id: string;
  price: number;
  count: number;
  start_time: string;
  duration: number;

  users: Partial<Omit<IBookingEmployee, "full_name" | "avatar" | "phone" | "position">>[];
}

export interface IBookingActionCredentials {
  // name: string;
  // start_time: string;
  // end_time: string;
  // date: string;
  // service_id: string;
  // payment_method: PaymentMethodType;
  // customer_id: string;

  services: IBookingServiceActionCredentials[];
  customers: Partial<Omit<IBookingCustomer, "full_name" | "avatar" | "birthday" | "email" | "profile_id">>[];

  comment?: string | null;
  location_id: string;
  status?: BookingStatusType;
}

export interface IBookingConfirmCredentials {
  params: {
    booking_id: string;
  }
  body: {
    status: OrderStatusType;
    payment_method?: PaymentMethodType;
  }
}

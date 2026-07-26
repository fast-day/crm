import type { IBooking } from "@/entities/booking";

export type ICustomerBooking = Omit<IBooking, "customer">;

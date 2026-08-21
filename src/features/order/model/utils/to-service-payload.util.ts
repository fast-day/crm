import type { IBookingService } from "@/entities/booking";

export const toServicePayload = (services: IBookingService[]): Pick<IBookingService, "booking_service_id" | "booking_service_count">[] =>
  services.map((service) => ({
    booking_service_id: service.booking_service_id,
    booking_service_count: service.booking_service_count,
  }));
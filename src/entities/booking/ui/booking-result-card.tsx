import { cn, formatDateWeek } from "@/shared/utils";
import type { IBookingDetail } from "../model/types/booking.type";
import { cva } from "class-variance-authority";
import { BOOKING_CANCEL_REASON } from "@/shared/constants/booking-cancel-reacon";

const variants = cva("p-6 rounded-xl flex flex-col items-center", {
  variants: {
    status: {
      completed: "bg-success-background/15 text-green",
      cancelled: "bg-error-background/15 text-red",
      new: undefined,
    },
    default: {
      status: "success"
    }
  }
});

export const BookingResultCard = ({ status, date, start_time, updated_date, updated_time, cancel_reason }: IBookingDetail) => {
  return (
    <div className={cn(variants({ status }))}>
      <div className="text-center font-bold">{formatDateWeek(date)} {start_time}</div>
      <div className="mt-3">
        <p className="text-md text-center font-medium">{status === "completed" ? "Запись завершена" : "Запись была отменена"}</p>
        <p className="text-xs text-center font-medium">{formatDateWeek(updated_date)} {updated_time}</p>
        {cancel_reason && <div className="text-xs text-center font-medium mt-1.5">Причина: {BOOKING_CANCEL_REASON[cancel_reason]}</div>}
      </div>
    </div>
  )
}

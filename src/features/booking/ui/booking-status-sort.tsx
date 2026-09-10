import { Button } from "@/shared/ui";
import { cn } from "@/shared/utils";

interface IBookingStatusSortProps {
  status?: BookingStatusType;
  handleChange: (name: "status", status: BookingStatusType) => void;
}

const variant = ["new", "completed", "cancelled"] as BookingStatusType[];

const BOOKING_STATUS: Record<BookingStatusType, string> = {
  // "all": "Все",
  "new": "Новые",
  "completed": "Завершенные",
  "cancelled": "Отмененные",
};

export const BookingStatusSort = ({ status, handleChange }: IBookingStatusSortProps) => {
  return (
    variant.map((v, idx) => (
      <Button
        key={idx}
        variant={"action"}
        className={cn(status === v ? "bg-white" : "bg-transparent", "")}
        size={"size_40"}
        onClick={() => handleChange("status", v)}
      >{BOOKING_STATUS[v]}</Button>
    ))
  )
}

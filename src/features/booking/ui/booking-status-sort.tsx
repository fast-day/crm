import { Button, Card, CardContent } from "@/shared/ui";
import { cn } from "@/shared/utils";

interface IBookingStatusSortProps {
  status?: BookingStatusType;
  handleChange: (name: "status", status: BookingStatusType | "all") => void;
}

const variant = ["all", "new", "pending", "confirmed", "cancelled", "completed"] as BookingStatusType[] | "all"[];

const BOOKING_STATUS: Record<BookingStatusType | "all", string> = {
  "all": "Все",
  "new": "Новые",
  "pending": "В ожидании",
  "confirmed": "Подтвержденные",
  "completed": "Завершенные",
  "cancelled": "Отмененные",
  "expired": "Просрочен"
};

export const BookingStatusSort = ({ status, handleChange }: IBookingStatusSortProps) => {
  return (
    <Card>
      <CardContent className="p-2 gap-2 flex">
        {variant.map((v, idx) => (
          <Button
            key={idx}
            variant={"action"}
            className={cn((v === "all" ? !status : status === v) ? "bg-white" : "")}
            size={"size_40"}
            onClick={() => handleChange("status", v)}
          >{BOOKING_STATUS[v]}</Button>
        ))}
      </CardContent>
    </Card>
  )
}

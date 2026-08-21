import { updateCount } from "@/entities/orders";
import { useOrderCalculate } from "@/features/order";
import { useAppDispatch } from "@/shared/hooks";
import { Button } from "@/shared/ui"
import { Minus, PlusIcon } from "lucide-react"

interface IBookingAddServiceActionsProps {
  booking_service_id: string;
  booking_service_count: number;
}

export const BookingAddServiceActions = ({ booking_service_id, booking_service_count }: IBookingAddServiceActionsProps) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useOrderCalculate();

  const handleAdd = () => dispatch(updateCount({ booking_service_id, booking_service_count: Math.min(booking_service_count + 1, 100) }));
  const handleRemove = () => dispatch(updateCount({ booking_service_id, booking_service_count: Math.max(booking_service_count - 1, 1) }));

  return (
    <div className="flex items-center">
      <Button
        variant={"gray"}
        size={"icon_36"}
        disabled={booking_service_count === 1 || isLoading}
        onClick={handleRemove}
      ><Minus width={20} height={20} /></Button>
      <div className="flex items-center justify-center font-semibold text-sm w-6">{booking_service_count}</div>
      <Button
        variant={"gray"}
        size={"icon_36"}
        disabled={booking_service_count === 100 || isLoading}
        onClick={handleAdd}
      ><PlusIcon width={20} height={20} /></Button>
    </div>
  )
}

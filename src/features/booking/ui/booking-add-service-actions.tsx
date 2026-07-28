import { useDebounce } from "@/shared/hooks";
import { Button } from "@/shared/ui"
import { Minus, PlusIcon } from "lucide-react"
import { useEffect, useState } from "react";

interface IBookingAddServiceActionsProps {
  booking_service_count: number;
}

export const BookingAddServiceActions = ({ booking_service_count }: IBookingAddServiceActionsProps) => {
  const [count, setCount] = useState<number>(booking_service_count);

  const handleAdd = () => {
    setCount(p => Math.min(p + 1, 100));
  }
  const handleRemove = () => {
    setCount(p => Math.max(p - 1, 1));
  }

  const debounce = useDebounce(count, 800);

  useEffect(() => {
    if (debounce === booking_service_count) return;
    console.log("===== COUNT =====", count);
  }, [debounce]);

  return (
    <div className="flex items-center">
      <Button
        variant={"gray"}
        size={"icon_36"}
        disabled={count === 1}
        onClick={handleRemove}
      ><Minus width={20} height={20} /></Button>
      <div className="flex items-center justify-center font-semibold text-sm w-6">{count}</div>
      <Button
        variant={"gray"}
        size={"icon_36"}
        disabled={count === 100}
        onClick={handleAdd}
      ><PlusIcon width={20} height={20} /></Button>
    </div>
  )
}

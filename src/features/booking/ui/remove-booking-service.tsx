import { removeBookingCreate } from "@/entities/booking"
import { useDialog } from "@/entities/dialog"
import { useAppDispatch } from "@/shared/hooks"
import { Button } from "@/shared/ui"
import { X } from "lucide-react"
import { memo } from "react"
 
export const RemoveBookingService = memo(({ idx }: { idx: number }) => {
  const dispatch = useAppDispatch();
  const { openConfirmDialog } = useDialog();

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const confirm = await openConfirmDialog({
      title: "Удалить услугу",
      description: "Услуга будет убрана из записи. Вы уверены?",
    });

    if (confirm) dispatch(removeBookingCreate(idx));
  }
  return (
    <Button
      size={"icon_18"}
      variant={"remove"}
      className={"absolute -top-0.75 -right-0.75 opacity-80"}
      onClick={handleRemove}
    ><X size={12} /></Button>
  )
});

RemoveBookingService.displayName = "RemoveBookingService";

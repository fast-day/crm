import { CloseIcon, DotsVerticalIcon } from "@/shared/icons"
import { Button, Dropdown, DropdownContent, DropdownItem, DropdownLabel, DropdownTrigger, Spinner } from "@/shared/ui"
import { useBookingAction } from "../model/hooks/booking-action.hook";

export const BookingAction = ({ booking_id }: { booking_id: string }) => {
  const { updateStatus, isLoading } = useBookingAction();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          type={"button"}
          size={"icon_60"}
          variant={"white"}
          className={"420:w-auto w-full min-w-15"}
          disabled={isLoading}
        >{isLoading ? <Spinner className="text-current" /> : <DotsVerticalIcon className="rotate-90" width={20} height={20} />}</Button>
      </DropdownTrigger>
      <DropdownContent align={"start"} side={"top"} className="p-0 min-w-45">
        <DropdownLabel>Выберите действие</DropdownLabel>
        <DropdownItem
          onClick={() => updateStatus(booking_id, "cancelled", { title: "Отменить запись?", description: "После отмены запись нельзя будет изменить или восстановить" })}
          className={"px-3 py-2.5 text-red hover:bg-red/15 rounded-none"}
          icon={<CloseIcon />}
        >Отменить</DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}

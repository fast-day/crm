import { BookingChangeServicePrice, BookingSelectServices } from "@/features/booking"
import { Button, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui"
import { useEffect, useState } from "react";
import { BookingScheduleIntervals } from "./booking-schedule-intervals";
import { formatDateWeek } from "@/shared/utils";
import { useAppDispatch } from "@/shared/hooks";
import { setBookingCreate, updateBookingCreate, type BookingCreate } from "@/entities/booking";
import { dialogSelector, useDialog } from "@/entities/dialog";
import { validateAddedBooking } from "@/features/booking/model/utils/validation.util";
import { toast } from "sonner";
import type { IMe } from "@/entities/account";
import { useSelector } from "react-redux";

interface BookingChangeServiceProps {
  location_id: string;
  date: string;
  account: IMe | null;
}

export const BookingChangeService = ({ location_id, date, account }: BookingChangeServiceProps) => {
  const dispatch = useAppDispatch();
  const { closeDialog } = useDialog();
  
  const dialog = useSelector(dialogSelector).dialog;
  const editing = dialog.name === "booking_service_create" ? dialog.data : undefined;

  const empty: BookingCreate = { service: undefined, date, time: undefined, location: undefined, employee: undefined, };
  const [setting, setSetting] = useState<BookingCreate>(empty);

  useEffect(() => {
    setSetting(editing ? { ...editing.booked } : empty);
  }, [editing]);

  const handleSave = () => {
    const errors = validateAddedBooking(setting);
    if (errors.length > 0) {
      toast.error("Заполните все поля", { description: errors.map(e => e.message).join(" • ") });
      return;
    }

    const item = { service: setting.service, date, time: setting.time };

    dispatch(editing ? updateBookingCreate({ index: editing.index, item }) : setBookingCreate(item));
    closeDialog();
    setSetting({ service: undefined, date, time: undefined });
  }

  const onSelectInterval = (time: string) => {
    setSetting((p) => ({ ...p, time }));
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{editing ? "Редактирование услуги" : "Добавление услуги"}</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <div className="space-y-5">
        <BookingSelectServices
          setSetting={setSetting}
          location_id={location_id}
          service={setting.service}
          user_id={account?.uuid}
        />
        {(setting.service) && <BookingChangeServicePrice setSetting={setSetting} price={setting?.service?.prices.price} />}

        {(setting.service && account?.id) && (
          <>
            <div className="text-lg font-bold">{formatDateWeek(date)}</div>

            <BookingScheduleIntervals
              user_id={account.uuid}
              location_id={location_id}
              date={date}
              current_time={setting.time}
              duration={setting.service?.duration ?? 0}
              onSelectInterval={onSelectInterval}
            />
          </>
        )}
      </div>

      <DialogFooter>
        <DialogClose>Отменить</DialogClose>
        <Button variant={"dialog_apply"} onClick={handleSave}>Сохранить</Button>
      </DialogFooter>

    </DialogContent>
  )
}

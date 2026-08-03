import { BookingChangeServicePrice, BookingSelectServices, type ServiceSettingType } from "@/features/booking"
import { Button, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui"
import { useState } from "react";
import { BookingScheduleIntervals } from "./booking-schedule-intervals";
import { formatDateWeek } from "@/shared/utils";
import { useAppDispatch } from "@/shared/hooks";
import { setBookingCreate } from "@/entities/booking";
import { useDialog } from "@/entities/dialog";
import { validateAddedBooking } from "@/features/booking/model/utils/validation.util";
import { toast } from "sonner";
import type { IMe } from "@/entities/account";

interface BookingChangeServiceProps {
  location_id: string;
  date: string;
  account: IMe | null;
}

export const BookingChangeService = ({ location_id, date, account }: BookingChangeServiceProps) => {
  const dispatch = useAppDispatch();
  const [setting, setSetting] = useState<ServiceSettingType>(
    {
      service: undefined,
      date: date ?? undefined,
      time: undefined,
    }
  );
  
  const { closeDialog } = useDialog();

  const handleSave = () => {

    const errors = validateAddedBooking(setting);
    // console.log("🚀==== setting =====🚀",setting);
    if (errors.length > 0) {
      toast.error("Заполните все поля", { description: errors.map(e => e.message).join(" • ") });
      return;
    }

    dispatch(setBookingCreate({
      service: setting.service,
      // employee: setting.employee,
      date: date,
      time: setting.time,
    }))
    closeDialog();
    setSetting({
      service: undefined,
      date,
      time: undefined,
    });
  }

  const onSelectInterval = (time: string) => {
    setSetting((p) => ({ ...p, time }));
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Добавление услуги</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <div className="space-y-5">
        <BookingSelectServices
          setSetting={setSetting}
          location_id={location_id}
          service={setting.service}
          // services={setting.employee?.services}
          user_id={account?.id}
        />
        {(setting.service) && <BookingChangeServicePrice setSetting={setSetting} price={setting?.service?.prices.price}/>}

        {/* <BookingSelectEmployee setSetting={setSetting} location_id={location_id} users={setting.service?.users} employee={account} /> */}

        {(setting.service && account?.id) && (
          <>
            <div className="text-lg font-bold">{formatDateWeek(date)}</div>

            <BookingScheduleIntervals
              user_id={account.id}
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

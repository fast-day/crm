import { IntervalsField } from "@/features/schedule/ui/intervals-field"
import { EditIcon } from "@/shared/icons"
import { Button, Form, Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui"
import { bulkScheduleSchema, toSlots, type BulkScheduleForm } from "../model/schemas/schedule.schema";
import { useState } from "react";
import { formatDates, pluralizeDays, useBulkCreateMutation } from "@/entities/schedule";

interface ICustomizedSheetProps {
  dates: string[];
  userId: string;
  locationId: string;
  onSuccess: () => void;
}

export const CustomizedSheet = ({ dates, userId, locationId, onSuccess }: ICustomizedSheetProps) => {
  const [open, setOpen] = useState(false);

  const [saveSchedule, { isLoading }] = useBulkCreateMutation();

  const sortedDates = formatDates(dates);

  const handleSubmit = async (data: BulkScheduleForm) => {
    await saveSchedule({
      params: { location_id: locationId },
      body: { user_id: userId, slots: toSlots(dates, data) },
    }).unwrap();
    setOpen(false);
    onSuccess();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type={"button"}
          variant={"transparent"}
          size={"size_56"}
          iconLeft={<EditIcon width={18} height={18} />}
          className={"text-xs font-semibold hover:bg-card px-5 rounded-none border-r border-background"}
          classNameChild={"sm:block hidden"}
        >
          Настроить
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Настроить расписание</SheetTitle>
        </SheetHeader>

        <div className="p-6">
          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-xs opacity-50">Выбрано {pluralizeDays(dates.length)}</p>
              <div className="flex flex-wrap gap-2">
                {sortedDates.map(({ key, label }, i) => (
                  <span key={key} className="text-sm font-semibold">
                    {label}
                    {i < sortedDates.length - 1 && ","}
                  </span>
                ))}
              </div>
            </div>

            <Form
              id={"schedule-sheet-save"}
              onSubmit={(data) => handleSubmit(data)}
              schema={bulkScheduleSchema}
              options={{ defaultValues: { intervals: [ { start: "", end: "" } ] } }}
            >
              {({ control, formState }) => <IntervalsField control={control} formState={formState} isLoading={false} />}
            </Form>
          </div>
        </div>

        <SheetFooter className="space-y-1">
          <SheetDescription className="text-xs leading-4 opacity-50">Обратите внимание: эти настройки перезапишут существующее расписание</SheetDescription>
          <Button
            type={"submit"}
            form={"schedule-sheet-save"}
            disabled={isLoading}
            isLoading={isLoading}
          >Сохранить</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

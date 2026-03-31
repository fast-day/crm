import { useDialog } from "@/entities/dialog";
import { useCreateMutation, useUpdateMutation, type IScheduleIntervals } from "@/entities/schedule";
import { intervalsSchema, type IntervalsSchemaType } from "@/features/schedule/model/schemas/schedule.schema";
import { IntervalsField } from "@/features/schedule/ui/intervals-field";
import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, Form } from "@/shared/ui"
import { toast } from "sonner";

interface ScheduleDialogProps {
  location_id: string;
  data: {
    schedule_id: number | null;
    schedule: {
      date_key: string;
      year: number;
      month_index: number;
      day: number;
      backend_date: string,
    };
    intervals: IScheduleIntervals[];
  };
}

export const ScheduleDialog = ({ location_id, data }: ScheduleDialogProps) => {
  const { closeDialog } = useDialog();

  const [createSchedule, { isLoading: isCreating }] = useCreateMutation()
  const [updateSchedule, { isLoading: isUpdating }] = useUpdateMutation()

  const onSubmit = async (data: IntervalsSchemaType): Promise<void> => {
    try {
      console.log(data);
      // if (data.schedule_id != null) {
      //   await updateSchedule({
      //     params: { location_id, schedule_id: editingScheduleId },
      //     body: payloadBody,
      //   }).unwrap()
      // } else {
      //   await createSchedule({
      //     params: { location_id },
      //     body: payloadBody,
      //   }).unwrap()
      // }
    }
    catch (error) {
      console.error("Не удалось сохранить расписание");
      toast.error("Не удалось сохранить расписание", { description: JSON.stringify(error) });
    }
  }
  
  return (
    <Dialog open onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Настройка расписания</DialogTitle>
        </DialogHeader>

        <div>

          <Form
            id={"schedule-save"}
            onSubmit={(data) => onSubmit(data)}
            schema={intervalsSchema}
            options={{ defaultValues: { intervals: [ { start: "", end: "" } ] } }}
          >
            {({ control, formState }) => <IntervalsField control={control} formState={formState} />}
          </Form>

        </div>
        
        <DialogFooter>
          <DialogClose>Отменить</DialogClose>
          <Button
            form={"schedule-save"}
            variant={"dialog_apply"}
            isLoading={isCreating || isUpdating}
            disabled={isCreating || isUpdating}
          >Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

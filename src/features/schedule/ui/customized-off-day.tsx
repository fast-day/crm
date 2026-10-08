import { useDialog } from "@/entities/dialog";
import { useBulkDayOffCreateMutation } from "@/entities/schedule";
import { BanIcon } from "@/shared/icons";
import { Button } from "@/shared/ui";

interface ICustomizedOffDayProps {
  userId: string;
  locationId: string;
  dates: string[];
  onSuccess: () => void;
}

export const CustomizedOffDay = ({ userId, locationId, dates, onSuccess }: ICustomizedOffDayProps) => {
  const { openConfirmDialog } = useDialog();

  const [createDayOff, { isLoading }] = useBulkDayOffCreateMutation();

  const onClick = async () => {
    if (!dates) return;

    const confirm = await openConfirmDialog({
      title: "Вы уверены?",
      description: "Вы уверены, что хотите удалить расписание на выбранные дни?",
    });
    
    if (!confirm) return;

    await createDayOff({
      params: { location_id: locationId },
      body: { user_id: userId, dates },
    }).unwrap();

    onSuccess();
  }

  return (
    <Button
      type={"button"}
      variant={"transparent"}
      size={"size_56"}
      onClick={onClick}
      disabled={isLoading}
      iconLeft={<BanIcon width={18} height={18} className="text-red" />}
      className={"text-xs font-semibold hover:bg-card px-5 rounded-none border-r border-background"}
      classNameChild={"sm:block hidden"}
    >Выходной</Button>
  )
}

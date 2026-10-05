import { useChangeBookingStatusMutation } from "@/entities/booking";
import { useDialog } from "@/entities/dialog";
import { getErrorMessage } from "@/shared/utils";
import { useState } from "react";
import { toast } from "sonner";

interface IUseBookingActionReturnProps {
  isLoading: boolean;
  updateStatus: (booking_id: string, status: BookingStatusType, confirm: { title: string, description: string }) => Promise<void>;
}

export const useBookingAction = (): IUseBookingActionReturnProps => {
  const { openConfirmDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);

  const [changeStatus] = useChangeBookingStatusMutation();

  const updateStatus = async (booking_id: string, status: BookingStatusType, confirm: { title: string, description: string }): Promise<void> => {
    const isConfirm = await openConfirmDialog(confirm);

    if (!isConfirm) return;

    setIsLoading(true);
    try {
      await changeStatus({ status, params: { booking_id } }).unwrap();
    }
    catch (err) {
      toast.error(getErrorMessage(err));
      console.error(`Не удалось обновить статус: ${status}... ${err}`);
    }
    finally {
      setIsLoading(false);
    }
  }

  return { isLoading, updateStatus };
}
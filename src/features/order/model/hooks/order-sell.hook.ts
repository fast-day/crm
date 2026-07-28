import { useCompleteBookingMutation, useConfirmBookingMutation, type IBookingConfirmCredentials } from "@/entities/booking";
import { useDialog } from "@/entities/dialog";
import { getErrorMessage } from "@/shared/utils";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

interface IUseOrderSellReturnProps {
  payment: PaymentMethodType | null;
  isConfirming: boolean;
  IsCompleting: boolean;

  handleSave: (booking_id: string) => Promise<void>;
  handlePay: (booking_id: string) => Promise<void>;
  selectPayment: (method: PaymentMethodType | null) => void;
}

export const useOrderSell = (): IUseOrderSellReturnProps => {
  const navigate = useNavigate();

  const [payment, setPayment] = useState<PaymentMethodType | null>(null);

  const { openDialog } = useDialog();

  const [confirm, { isLoading: isConfirming }] = useConfirmBookingMutation();
  const [complete, { isLoading: IsCompleting }] = useCompleteBookingMutation();

  const handleSave = async (booking_id: string): Promise<void> => {
    if (payment) {
      openDialog("cancel_payment_method", undefined);
      return;
    }

    try {
      const req = {
        params: {
          booking_id,
        },
        body: {
          status: "unpaid",
        }
      } satisfies IBookingConfirmCredentials;
      const res = await confirm(req).unwrap();
      navigate({ to: `/orders/${res.order.id}` });
    }
    catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  const handlePay = async (booking_id: string): Promise<void> => {
    if (!payment) {
      openDialog("select_payment_method", undefined);
      return;
    };

    try {
      const res = await complete({ booking_id }).unwrap();
      console.log(res);
      navigate({ to: `/orders/${res.order_id}`, replace: true });
    }
    catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  const selectPayment = (method: PaymentMethodType | null) => {
    setPayment(method);
  }

  return {
    payment,
    isConfirming,
    IsCompleting,

    handleSave,
    handlePay,
    selectPayment,
  }
}

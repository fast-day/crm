import { useDialog } from "@/entities/dialog";
import { useCreateOrderMutation, usePaidOrderMutation } from "@/entities/orders";
import { getErrorMessage } from "@/shared/utils";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

interface IUseOrderSellReturnProps {
  payment: PaymentMethodType | null;
  isConfirming: boolean;
  isPaying: boolean;

  handleSave: (booking_id: string) => Promise<void>;
  handlePay: (booking_id: string, order_id: string | null) => Promise<void>;
  selectPayment: (method: PaymentMethodType | null) => void;
}

export const useOrderSell = (): IUseOrderSellReturnProps => {
  const navigate = useNavigate();

  const [payment, setPayment] = useState<PaymentMethodType | null>(null);

  const { openDialog } = useDialog();

  const [confirm, { isLoading: isConfirming }] = useCreateOrderMutation();
  const [pay, { isLoading: isPaying }] = usePaidOrderMutation();

  const handleSave = async (booking_id: string): Promise<void> => {
    if (payment) {
      openDialog("cancel_payment_method", undefined);
      return;
    }

    try {
      const res = await confirm({ booking_id }).unwrap();
      navigate({ to: `/orders/${res.id}` });
    }
    catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  const handlePay = async (booking_id: string, order_id: string | null): Promise<void> => {
    if (!payment) {
      openDialog("select_payment_method", undefined);
      return;
    };

    try {
      let orderId = order_id;

      if (!orderId) {
        const order = await confirm({ booking_id }).unwrap();
        orderId = order.id;
      }

      const res = await pay({
        order_id: orderId,
        body: { payment_method: payment },
      }).unwrap();
      navigate({ to: `/orders/${res.id}`, replace: true });
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
    isPaying,

    handleSave,
    handlePay,
    selectPayment,
  }
}

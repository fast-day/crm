import type { IBookingService } from "@/entities/booking";
import { useDialog } from "@/entities/dialog";
import { useCreateOrderMutation, usePaidOrderMutation } from "@/entities/orders";
import { getErrorMessage } from "@/shared/utils";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { toServicePayload } from "../utils/to-service-payload.util";
import { updateAccount } from "@/entities/account";
import { useAppDispatch } from "@/shared/hooks";

interface IUseOrderSellReturnProps {
  payment: PaymentMethodType | null;
  isConfirming: boolean;
  isPaying: boolean;

  handleSave: (booking_id: string) => Promise<void>;
  handlePay: (booking_id: string, order_id: string | null) => Promise<void>;
  selectPayment: (method: PaymentMethodType | null) => void;
}

interface IUseOrderSellProps {
  isDirty: boolean;
  services: IBookingService[];
}

export const useOrderSell = ({ isDirty, services }: IUseOrderSellProps): IUseOrderSellReturnProps => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      const res = await confirm({
        booking_id,
        body: {
          services: toServicePayload(services),
        },
      }).unwrap();

      dispatch(updateAccount({ has_bookings: true }));
      navigate({ to: `/finance/orders/${res.id}` });
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

      if (!orderId || isDirty) {
        const order = await confirm({
          booking_id,
          body: {
            services: toServicePayload(services),
          },
        }).unwrap();
        orderId = order.id;
      }

      const res = await pay({
        order_id: orderId,
        body: { payment_method: payment },
      }).unwrap();

      dispatch(updateAccount({ has_bookings: true }));
      navigate({ to: `/finance/orders/${res.id}`, replace: true });
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

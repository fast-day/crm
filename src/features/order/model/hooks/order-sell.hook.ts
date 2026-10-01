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

type TIsLoading = {
  isConfirming: boolean;
  isPaying: boolean;
}

interface IUseOrderSellReturnProps extends TIsLoading {
  payment: PaymentMethodType | null;

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
  const [isLoading, setIsLoading] = useState<TIsLoading>({ isConfirming: false, isPaying: false });

  const { openDialog } = useDialog();

  const [confirm] = useCreateOrderMutation();
  const [pay] = usePaidOrderMutation();

  const handleSave = async (booking_id: string): Promise<void> => {
    if (payment) {
      openDialog("cancel_payment_method", undefined);
      return;
    }

    setIsLoading(p => ({ ...p, isConfirming: true }));

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
    finally {
      setIsLoading(p => ({ ...p, isConfirming: false }));
    }
  }

  const handlePay = async (booking_id: string, order_id: string | null): Promise<void> => {
    if (!payment) {
      openDialog("select_payment_method", undefined);
      return;
    };

    setIsLoading(p => ({ ...p, isPaying: true }));

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
    finally {
      setIsLoading(p => ({ ...p, isPaying: false }));
    }
  }

  const selectPayment = (method: PaymentMethodType | null) => {
    setPayment(method);
  }

  return {
    payment,
    ...isLoading,

    handleSave,
    handlePay,
    selectPayment,
  }
}

import type { IBookingService } from "@/entities/booking";
import { useCalculateOrderMutation, type ICalculateOrder } from "@/entities/orders"
import { getErrorMessage } from "@/shared/utils";
import { useCallback } from "react";
import { toast } from "sonner";

interface IUseOrderCalculateReturnProps {
  calculate: (booking_id: string, services: IBookingService[]) => Promise<void>;
  isLoading: boolean;
  result: ICalculateOrder;
}

const DEFAULT_CALCULATE_RESULT: ICalculateOrder = {
  discount: 0,
  subtotal: 0,
  total: 0,
}

export const useOrderCalculate = (): IUseOrderCalculateReturnProps => {
  const [calc, { data: result, isLoading }] = useCalculateOrderMutation({
    fixedCacheKey: "order-calculate",
  });

  const calculate = useCallback(async (booking_id: string, services: IBookingService[]): Promise<void> => {
    try {
      await calc({
        booking_id,
        body: {
          services: services.map((service) => ({
            booking_service_id: service.booking_service_id,
            booking_service_count: service.booking_service_count,
          })),
        }
      }).unwrap();
    }
    catch (err) {
      toast.error(getErrorMessage(err));
      console.error("Не удалось рассчитать стоимоть заказа");
    }
  }, [calc]);

  return { calculate, isLoading, result: result ?? DEFAULT_CALCULATE_RESULT };
}

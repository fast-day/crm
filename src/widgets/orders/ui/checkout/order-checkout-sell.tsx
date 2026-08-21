import { type IBookingDetail } from "@/entities/booking"
import { orderSelector, setServices, type IOrderDetail } from "@/entities/orders";
import { OrderSelectPaymentMethod } from "./order-select-payment-method";
import { Button } from "@/shared/ui";
import { useNavigate } from "@tanstack/react-router";
import { formatPrice } from "@/shared/utils";
import { OrderPaymentResult } from "./order-payment-result";
import { useOrderCalculate, useOrderSell } from "@/features/order";
import { useEffect, useRef } from "react";
import { ContentLayout } from "@/widgets/layout";
import { ContentPanel } from "@/widgets/ content-panel";
import { CustomerCard } from "@/entities/customers";
import { OrderServices } from "./order-services";
import { LazyBlur } from "@/widgets/loading";
import { useAppDispatch, useAppSelector, useDebounce } from "@/shared/hooks";

interface IOrderCheckoutSellProps {
  booking_id: string;
  booking: IBookingDetail;
  order?: IOrderDetail;
}

export const OrderCheckoutSell = ({ booking_id, booking }: IOrderCheckoutSellProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isFirstRender = useRef(true);

  const { services, revision } = useAppSelector(orderSelector);
  const debouncedServices = useDebounce(revision, 800);

  const { handleSave, handlePay, payment, selectPayment, isConfirming, isPaying } = useOrderSell();

  const { calculate, isLoading: calculateLoading, result: calculateResult } = useOrderCalculate();
  
  useEffect(() => {
    if (booking.invoice?.status === "paid") {
      navigate({ to: `/orders/${booking.order_id}`, replace: true });
      return;
    }
  }, [booking.invoice?.status]);
  
  useEffect(() => {
    dispatch(setServices(booking.booking_services));
    console.log("booking.booking_services", booking.booking_services);
    calculate(booking_id, booking.booking_services);
  }, [booking_id]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    calculate(booking_id, services);
  }, [debouncedServices]);

  return (
    <div className="mt-8 h-full">
      <div className="flex h-full gap-8 1100:flex-row flex-col">

        <ContentLayout className="max-w-full">
          <OrderSelectPaymentMethod current_method={payment} selectPayment={selectPayment} />
          {payment && (
            <OrderPaymentResult
              payment={"online"}
              calculate={calculateResult}
              calculateLoading={calculateLoading}
              cancel={() => selectPayment(null)}
            />
          )}
        </ContentLayout>

        <ContentPanel
          content={
            <>
              <CustomerCard
                id={booking.customer.customer_attributes.profile_id}
                full_name={booking.customer.customer_attributes.full_name}
                first_name={booking.customer.customer_attributes.first_name}
                last_name={booking.customer.customer_attributes.last_name}
                phone={booking.customer.customer_attributes.phone}
                avatar={booking.customer.customer_attributes.avatar}
              />
              <OrderServices />
              <div className="flex items-center justify-between gap-2.5 py-8 border-b border-border">
                <p className="font-medium text-lg opacity-50">Итого</p>
                
                <div className="relative px-2 -mr-2">
                  {calculateLoading && <LazyBlur className="rounded-sm p-2 backdrop-blur-2!" />}
                  <span className="font-bold text-lg">{formatPrice(calculateResult.total)} руб.</span>
                </div>
                {/* <span className="font-bold text-lg">{formatPrice(order?.subtotal ? order.subtotal : booking.booking_services.reduce((sum, s) => sum + s.booking_service_price, 0))} руб.</span> */}
              </div>
            </>
          }
          actions={
            <div className="flex gap-3">
              <Button
                type={"button"}
                size={"size_60"}
                variant={"white"}
                className={"p-5"}
                isLoading={isConfirming}
                disabled={isConfirming}
                onClick={() => handleSave(booking.id, services)}
              >Сохранить</Button>
              <Button
                type={"button"}
                size={"size_60"}
                className={"w-full"}
                isLoading={isPaying}
                disabled={isPaying}
                onClick={() => handlePay(booking.id, booking.order_id)}
              >Оплатить</Button>
            </div>
          }
        />

      </div>
    </div>
  )
}

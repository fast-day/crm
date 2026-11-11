import { useGetBookingQuery } from "@/entities/booking";
import { dialogSelector } from "@/entities/dialog";
import { useGetOrderQuery } from "@/entities/orders";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle, Skeleton } from "@/shared/ui";
import { BookingNotFound } from "@/widgets/booking";
import { CancelPaymentMethodDialog, OrderCheckoutLoading, OrderCheckoutSell, OrderNotFound, SelectPaymentMethodDialog } from "@/widgets/orders";
import { useSelector } from "react-redux";

interface OrderCheckoutProps {
  booking_id: string;
  order_id?: string;
}

export const OrderCheckout = ({ booking_id, order_id }: OrderCheckoutProps) => {
  const { dialog } = useSelector(dialogSelector);

  const { data: bookingData, isError: bookingError, isLoading: bookingLoading } = useGetBookingQuery(
    { booking_id },
    { refetchOnMountOrArgChange: true },
  );
  const { data: orderData, isError: orderError, isLoading: orderLoading } = useGetOrderQuery(
    { order_id: order_id! },
    { skip: !order_id, refetchOnMountOrArgChange: true },
  );

  const isLoading = bookingLoading || (Boolean(order_id) && orderLoading);
  const hasError = bookingError || orderError;

  return (
    <>
      <PageHeader>
        <div>
          {isLoading ?
          <Skeleton className="w-45 h-11 rounded-xl" />
          : <PageHeaderTitle>{orderData ? `Платеж № ${orderData.tag}` : "Оплата записи"}</PageHeaderTitle>}
        </div>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {isLoading && <OrderCheckoutLoading />}
      {!isLoading && bookingError && <BookingNotFound />}
      {!isLoading && !bookingError && orderError && <OrderNotFound />}
      {!isLoading && !hasError && bookingData && (
        <OrderCheckoutSell booking_id={booking_id} booking={bookingData} />
      )}
      {dialog.name === "cancel_payment_method" && <CancelPaymentMethodDialog />}
      {dialog.name === "select_payment_method" && <SelectPaymentMethodDialog />}
    </>
  )
}

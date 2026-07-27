import { useGetBookingQuery } from "@/entities/booking";
import { useGetOrderQuery } from "@/entities/orders";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui";
import { BookingNotFound } from "@/widgets/booking";
import { AppLoading } from "@/widgets/loading";
import { OrderCheckoutSell, OrderNotFound } from "@/widgets/orders";

interface OrderCheckoutProps {
  booking_id: string;
  order_id?: string;
}

export const OrderCheckout = ({ booking_id, order_id }: OrderCheckoutProps) => {
  const { data: bookingData, isError: bookingError, isLoading: bookingLoading } = useGetBookingQuery({ booking_id });
  const { data: orderData, isError: orderError, isLoading: orderLoading } = useGetOrderQuery(
    { order_id: order_id! },
    { skip: !order_id },
  );

  const isLoading = bookingLoading || (Boolean(order_id) && orderLoading);
  const hasError = bookingError || orderError;

  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle>{orderData ? `Заказ № ${orderData.tag}` : "Оформление заказа"}</PageHeaderTitle>
        </div>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {isLoading && <AppLoading />}
      {!isLoading && bookingError && <BookingNotFound />}
      {!isLoading && !bookingError && orderError && <OrderNotFound />}
      {!isLoading && !hasError && bookingData && (
        <OrderCheckoutSell booking={bookingData} order={orderData} />
      )}
    </>
  )
}

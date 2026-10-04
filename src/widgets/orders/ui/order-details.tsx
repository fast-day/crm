import type { IOrderDetail } from "@/entities/orders";
import { OrderResult } from "./result/order-result";
import { ContentLayout } from "@/widgets/layout";
import { ContentPanel } from "@/widgets/ content-panel";
import { CustomerCard } from "@/entities/customers";
import { OrderDetailActions } from "./result/order-detail-actions";

interface IOrderDetailsProps {
  order: IOrderDetail;
}

export const OrderDetails = ({ order }: IOrderDetailsProps) => {

  return (
    <>
      <ContentLayout>
        <OrderResult {...order} />
      </ContentLayout>

      <ContentPanel
        className={"max-w-135"}
        title={"Итого"}
        actionClassName={"mt-auto"}
        content={<CustomerCard {...order.bookings[0].customer} />}
        actions={<OrderDetailActions status={order.status} order_id={order.id} booking_id={order.bookings[0].id} />}
      />
    </>
  )
}

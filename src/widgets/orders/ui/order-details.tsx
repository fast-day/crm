import type { IOrderDetail } from "@/entities/orders";
import { OrderResult } from "./result/order-result";
import { OrderResultLoading } from "./result/order-result-loading";
import { OrderDetailsPanelLoading } from "./result/order-details-panel-loading";
import { ContentLayout } from "@/widgets/layout";
import { ContentPanel } from "@/widgets/ content-panel";
import { CustomerCard } from "@/entities/customers";
import { OrderDetailActions } from "./result/order-detail-actions";

interface IOrderDetailsProps {
  order: IOrderDetail;
  isFetching: boolean;
}

export const OrderDetails = ({ order, isFetching }: IOrderDetailsProps) => {
  return (
    <div className="h-full">
      <div className="flex h-full 1100:flex-row flex-col-reverse gap-8">

        <ContentLayout>
            {isFetching ? <OrderResultLoading /> : <OrderResult {...order} />}
        </ContentLayout>

        {isFetching ? (
          <OrderDetailsPanelLoading />
        ) : ( 
          <ContentPanel
            className={"max-w-135"}
            title={"Итого"}
            actionClassName={"mt-auto"}
            content={<CustomerCard {...order.bookings[0].customer} />}
            actions={<OrderDetailActions status={order.status} order_id={order.id} booking_id={order.bookings[0].id} />}
          />
        )}
      </div>
    </div>
  )
}

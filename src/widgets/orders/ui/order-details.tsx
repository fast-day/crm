import type { IOrderDetail } from "@/entities/orders";
import { OrderContentNavbar } from "./result/order-content-navbar";
import { OrderResult } from "./result/order-result";
import { OrderResultLoading } from "./result/order-result-loading";
import { OrderContentNavbarLoading } from "./result/order-content-navbar-loading";

interface IOrderDetailsProps {
  order: IOrderDetail;
  isFetching: boolean;
}

export const OrderDetails = ({ order, isFetching }: IOrderDetailsProps) => {
  return (
    <div className="h-full">
      <div className="grid grid-cols-3 gap-8 h-full">
        <div className="col-span-2 space-y-8 flex justify-center">
          <div className="flex flex-col w-full">
            {isFetching ? <OrderResultLoading /> : <OrderResult {...order} />}
          </div>
        </div>

        {isFetching ? <OrderContentNavbarLoading /> :  <OrderContentNavbar {...order} customer={order.bookings[0].customer} />}
      </div>
    </div>
  )
}

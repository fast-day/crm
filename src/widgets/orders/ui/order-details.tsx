import type { IOrderDetail } from "@/entities/orders";
import { OrderContentNavbar } from "./result/order-content-navbar";
import { OrderResult } from "./result/order-result";

interface IOrderDetailsProps {
  order: IOrderDetail;
}

export const OrderDetails = ({ order }: IOrderDetailsProps) => {
  return (
    <div className="h-full">
      <div className="grid grid-cols-3 gap-8 h-full">
        <div className="col-span-2 space-y-8 flex justify-center">
          <div className="flex flex-col w-full">
            <OrderResult {...order} />
          </div>
        </div>

        <OrderContentNavbar {...order} customer={order.bookings[0].customer} />
      </div>
    </div>
  )
}

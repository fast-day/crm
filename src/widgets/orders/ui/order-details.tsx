import type { IOrderDetail } from "@/entities/orders";

interface IOrderDetailsProps {
  order: IOrderDetail;
}

export const OrderDetails = ({ order }: IOrderDetailsProps) => {
  console.log("ORDER", order);
  return (
    <div className="mt-8 h-full">
        <div className="col-span-2 space-y-8">content</div>
    </div>
  )
}

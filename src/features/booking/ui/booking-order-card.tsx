import type { IBookingOrder } from "@/entities/booking";
import { ORDER_STATUS } from "@/shared/constants/order-status.constant";
import { Card, CardContent, Button, Badge } from "@/shared/ui";
import { formatPrice } from "@/shared/utils";
import { Link } from "@tanstack/react-router";

interface IBookingOrderCardProps {
  order: IBookingOrder;
}

export const BookingOrderCard = ({ order }: IBookingOrderCardProps) => {
  return (
    <Card className="bg-white mb-10">
      <CardContent className="p-5 space-y-5">
        <div className="flex items-center justify-between gap-2.5">
          <Badge variant={`${order.status}`} className="px-2 py-0.5 text-xss! font-bold rounded-lg border-none text-white">
              {(() => {
                const status = ORDER_STATUS[order.status];
                const Icon = status.icon;
                return (
                  <>
                    <Icon />
                    {status.label}
                  </>
                );
              })()}
          </Badge>
          <div className="font-bold">{formatPrice(order.subtotal)} ₽</div>
        </div>
        <Link to="result">
          <Button variant={"accent"} size={"size_48"} className="w-full bg-primary">Заказ № {order.tag}</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

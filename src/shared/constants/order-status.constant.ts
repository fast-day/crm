import { ArrowBackIcon, PaymentSuccessIcon, UnpaidOrderIcon } from "../icons";

type OrderEnumStatusType = {
  title: string;
  label: string;
  icon: React.ComponentType;
}

export const ORDER_STATUS: Record<OrderStatusType, OrderEnumStatusType> = {
  paid: { title: "Заказ завершен", label: "Оплачен", icon: PaymentSuccessIcon },
  unpaid: { title: "Заказ не оплачен", label: "Не оплачен", icon: UnpaidOrderIcon },
  cancelled: { title: "Заказ отмене", label: "Отменен", icon: ArrowBackIcon },
  refund: { title: "Заказ возвращён", label: "Возвращен", icon: ArrowBackIcon },
};

export const ORDER_STATUS_TITLE: Record<OrderStatusType, string> = {
  paid: "Заказ завершен",
  unpaid: "Заказ не оплачен",
  cancelled: "Заказ отменен",
  refund: "Заказ возвращён"
};

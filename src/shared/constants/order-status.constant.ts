import { ArrowBackIcon, PaymentSuccessIcon, UnpaidOrderIcon } from "../icons";

type OrderEnumStatusType = {
  title: string;
  label: string;
  icon: React.ComponentType;
}

export const ORDER_STATUS: Record<OrderStatusType, OrderEnumStatusType> = {
  paid: {
    title: "Оплачен",
    label: "Оплачен",
    icon: PaymentSuccessIcon,
  },
  unpaid: {
    title: "Ожидает оплаты",
    label: "Не оплачен",
    icon: UnpaidOrderIcon,
  },
  cancelled: {
    title: "Платёж отменён",
    label: "Отменён",
    icon: ArrowBackIcon,
  },
  refund: {
    title: "Деньги возвращены",
    label: "Возвращён",
    icon: ArrowBackIcon,
  },
};

export const ORDER_STATUS_TITLE: Record<OrderStatusType, string> = {
  paid: "Оплачен",
  unpaid: "Ожидает оплаты",
  cancelled: "Платёж отменён",
  refund: "Деньги возвращены",
};

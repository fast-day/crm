import { ArrowBackIcon, PaymentSuccessIcon } from "../icons";

type InvoiceEnumType = {
  title: string;
  label: string;
  icon: React.ComponentType;
}

export const INVOICE_TYPE: Record<InvoiceType, InvoiceEnumType> = {
  paid: { title: "Заказ завершен", label: "Оплачен", icon: PaymentSuccessIcon },
  refunded: { title: "Заказ возвращён", label: "Возвращен", icon: ArrowBackIcon },
};

export const INVOICE_TYPE_TITLE: Record<InvoiceType, string> = {
  paid: "Заказ завершен",
  refunded: "Заказ возвращён"
};

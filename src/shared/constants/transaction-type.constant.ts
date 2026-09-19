import type { TransactionType } from "@/entities/transactions";
import { CoinIcon, CloseIcon, PaymentSuccessIcon } from "../icons";

type TransactionEnumType = {
  name: string;
  icon: React.ComponentType;
}

export const TRANSACTION_TYPE: Record<TransactionType, TransactionEnumType> = {
  earning: { name: "Доход от услуги", icon: PaymentSuccessIcon},
  refund_deduction: { name: "Возврат средств", icon: CloseIcon },
  expense: { name: "Расход", icon: CoinIcon },
};

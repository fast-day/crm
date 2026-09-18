import type { TransactionType } from "@/entities/transactions";
import { CoinIcon, CloseIcon, PaymentSuccessIcon } from "../icons";

export const TRANSACTION_TYPE: Record<TransactionType, React.ComponentType> = {
  earning: PaymentSuccessIcon,
  expense: CoinIcon,
  refund_deduction: CloseIcon,
};

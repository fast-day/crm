import type { TransactionType } from "@/entities/transactions";
import { Card, CardContent, CardDescription, CardTitle } from "@/shared/ui";
import { formatPrice } from "@/shared/utils";
import { transactionMessage } from "../model/utils/message.util";

interface ITransactionDigitProps {
  total_amount: number;
  type: TransactionType | "all";
  start_date: string;
  end_date: string;
}

export const TransactionDigit = ({ total_amount, type, start_date, end_date }: ITransactionDigitProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
      <Card>
        <CardContent className="space-y-1.5">
          <CardTitle className="text-4xl font-extrabold">{formatPrice(total_amount)} ₽</CardTitle>
          <CardDescription className="opacity-60">{transactionMessage(type, { start_date, end_date })} {formatPrice(total_amount)} ₽</CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}

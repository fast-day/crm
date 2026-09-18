import { Card, CardContent, CardDescription, CardTitle } from "@/shared/ui";
import { formatPrice } from "@/shared/utils";

interface ITransactionDigitProps {
  total_amount: number;
}

export const TransactionDigit = ({ total_amount }: ITransactionDigitProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
      <Card>
        <CardContent className="space-y-1.5">
          <CardTitle className="text-4xl font-extrabold">{formatPrice(total_amount)} ₽</CardTitle>
          <CardDescription className="opacity-60">За этот месяц вы заработали {formatPrice(total_amount)} ₽</CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}

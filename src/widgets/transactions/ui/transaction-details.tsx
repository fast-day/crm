import type { ITransactionDetail } from "@/entities/transactions"

interface ITransactionDetailsProps {
  transaction: ITransactionDetail;
  isFetching: boolean;
}
export const TransactionDetails = ({ transaction }: ITransactionDetailsProps) => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="space-y-1">
          <div className="text-lg text-center font-bold">Страница находится в разработке</div>
          <p className="text-center text-xs opacity-50">ID: {transaction.id}</p>
          <p className="text-center text-xs opacity-50">Сумма: <span className="font-medium">{transaction.amount}</span></p>
      </div>
    </div>
  )
}

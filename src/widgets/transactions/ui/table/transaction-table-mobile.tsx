import { Badge, TableMobile, TableMobileBody, TableMobileCell, TableMobileRow, TableNotFound } from "@/shared/ui"
import { formatDate, formatPrice } from "@/shared/utils";
import { LazyBlur } from "@/widgets/loading";
import type { OrderTableProps } from "./types/props.type";
import { TRANSACTION_TYPE } from "@/shared/constants/transaction-type.constant";

export const TransactionTableMobile = ({ isFetching, transactions }: OrderTableProps) => {
  return (
    <TableMobile>
      <TableMobileBody>
        {isFetching && <LazyBlur />}
        {transactions?.length ?
          transactions.map((transaction) => (
            <TableMobileRow key={transaction.id}>
              <TableMobileCell thead="Тип">
                <div className="flex items-center gap-2">
                  <Badge type={transaction.category.mark} fill={"cube"}>
                    {(() => {
                      const Icon = TRANSACTION_TYPE[transaction.category.icon];
                      return <span className="size-4 1100:size-5"><Icon /></span>
                    })()}
                  </Badge>
                  <p className="text-xs">{transaction.category.name}</p>
                </div>
              </TableMobileCell>

              <TableMobileCell thead={"Дата"}>
                <div className="flex-col justify-center items-start gap-0">
                  <p>{formatDate(transaction.date)}</p>
                  <p className="opacity-50">{transaction.time}</p>
                </div>
              </TableMobileCell>

              <TableMobileCell thead={"Цена"}>
                <p className={transaction.amount.toString().includes("-") ? "text-red" : ""}>
                  {formatPrice(transaction.amount)} ₽
                </p>
              </TableMobileCell>
            </TableMobileRow>
          )) : (
            <TableMobileRow>
              <TableNotFound>Нет данных</TableNotFound>
            </TableMobileRow>
          )}
      
      </TableMobileBody>
    </TableMobile>
  )
}

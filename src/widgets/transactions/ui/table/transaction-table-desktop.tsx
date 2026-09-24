import React from "react";
import { Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableNotFound, TableRow, TableSeparator } from "@/shared/ui"
import { formatDate, formatPrice } from "@/shared/utils";
import { LazyBlur } from "@/widgets/loading";
import type { OrderTableProps } from "./types/props.type";
import { TRANSACTION_TYPE } from "@/shared/constants/transaction-type.constant";

export const TransactionTableDesktop = ({ transactions, isFetching }: OrderTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Тип</TableHead>
          <TableHead>Дата</TableHead>
          <TableHead>Итого</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="relative">
        {isFetching && <LazyBlur />}
        {transactions?.length ? 
          transactions.map((transaction, index) => (
            <React.Fragment key={transaction.id}>
              <TableRow>
                <TableCell>
                  <Badge type={transaction.category.mark} fill={"cube"}>
                    {(() => {
                      const Icon = TRANSACTION_TYPE[transaction.category.icon];
                      return <span className="size-5"><Icon /></span>
                    })()}
                  </Badge>
                  <p className="">{transaction.category.name}</p>
                </TableCell>
                <TableCell className="flex-col justify-center items-start gap-0">
                  <p>{formatDate(transaction.date)}</p>
                  <p className="opacity-50">{transaction.time}</p>
                </TableCell>
                <TableCell className={transaction.amount.toString().includes("-") ? "text-red" : ""}>
                  {formatPrice(transaction.amount)} ₽
                </TableCell>
              </TableRow>
              {index !== transactions.length - 1 && <TableSeparator />}
            </React.Fragment>
          )) : (
            <TableRow>
              <TableNotFound>Нет данных</TableNotFound>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  )
}

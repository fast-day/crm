import React from "react";
import { ChevronRightIcon } from "@/shared/icons"
import { Badge, Button, Table, TableBody, TableCell, TableCellActions, TableHead, TableHeader, TableNotFound, TableRow, TableSeparator } from "@/shared/ui"
import { formatDate, formatPrice } from "@/shared/utils";
import { LazyBlur } from "@/widgets/loading";
import { Link, useNavigate } from "@tanstack/react-router";
import type { OrderTableProps } from "./types/props.type";
import { TRANSACTION_TYPE } from "@/shared/constants/transaction-typeconstant";

export const TransactionTableDesktop = ({ transactions, isFetching }: OrderTableProps) => {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Статус</TableHead>
          <TableHead>Дата</TableHead>
          <TableHead>Категория</TableHead>
          <TableHead>Описание</TableHead>
          <TableHead>Итого</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody className="relative">
        {isFetching && <LazyBlur />}
        {transactions?.length ? 
          transactions.map((transaction, index) => (
            <React.Fragment key={transaction.id}>
              <TableRow onClick={() => navigate({ to: `${transaction.id}` })}>
                <TableCell>
                  <Badge type={transaction.type} fill={"cube"}>
                    {(() => {
                      const Icon = TRANSACTION_TYPE[transaction.type]
                      return <span className="size-5"><Icon /></span>
                    })()}
                  </Badge>
                </TableCell>
                <TableCell className="flex-col justify-center items-start gap-0">
                  <p>{formatDate(transaction.date)}</p>
                  <p className="opacity-50">{transaction.time}</p>
                </TableCell>
                <TableCell className="flex-col items-start justify-center">
                  {transaction.category ? (
                    <div>{transaction.category.name}</div>
                  ) : (
                    <div className="flex items-center justify-center flex-1 w-full">-</div>
                  )}
                </TableCell>
                <TableCell>
                  {transaction.description ?? "-"}
                </TableCell>
                <TableCell className={transaction.amount.toString().includes("-") ? "text-red" : ""}>
                  {formatPrice(transaction.amount)} ₽
                </TableCell>
                <TableCellActions>
                  <Link to={`${transaction.id}`}>
                    <Button variant={"white"} size={"icon_40"} animation={"toggle_sm"}>
                      <ChevronRightIcon width={17} height={17} />
                    </Button>
                  </Link>
                </TableCellActions>
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

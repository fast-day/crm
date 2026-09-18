import { ChevronRightIcon } from "@/shared/icons"
import { Badge, Button, TableMobile, TableMobileAction, TableMobileBody, TableMobileCell, TableMobileRow, TableNotFound } from "@/shared/ui"
import { formatDate, formatPrice } from "@/shared/utils";
import { LazyBlur } from "@/widgets/loading";
import { useNavigate } from "@tanstack/react-router";
import type { OrderTableProps } from "./types/props.type";
import { TRANSACTION_TYPE } from "@/shared/constants/transaction-typeconstant";

export const TransactionTableMobile = ({ isFetching, transactions }: OrderTableProps) => {
  const navigate = useNavigate();

  return (
    <TableMobile>
      <TableMobileBody>
        {isFetching && <LazyBlur />}
        {transactions?.length ?
          transactions.map((transaction) => (
            <TableMobileRow key={transaction.id} onClick={() => navigate({ to: `${transaction.id}` })}>
              <TableMobileCell thead="Статус">
                  <Badge type={transaction.type} fill={"cube"}>
                    {(() => {
                      const Icon = TRANSACTION_TYPE[transaction.type]
                      return <span className="size-4 1100:size-5"><Icon /></span>
                    })()}
                  </Badge>
              </TableMobileCell>

              <TableMobileCell thead={"Дата"}>
                <div className="flex-col justify-center items-start gap-0">
                  <p>{formatDate(transaction.date)}</p>
                  <p className="opacity-50">{transaction.time}</p>
                </div>
              </TableMobileCell>

              <TableMobileCell thead={"Категория"}>
                {transaction.category ? (
                  <div>{transaction.category.name}</div>
                ) : (
                  <div className="flex items-center justify-center flex-1 w-full">-</div>
                )}
              </TableMobileCell>

              <TableMobileCell thead={"Описание"}>
                {transaction.description ?? "-"}
              </TableMobileCell>

              <TableMobileCell thead={"Цена"} className={transaction.amount.toString().includes("-") ? "text-red" : ""}>
                {formatPrice(transaction.amount)} ₽
              </TableMobileCell>

              <TableMobileAction>
                <Button variant={"white"} size={"icon_32"} animation={"toggle_sm"} className={"rounded-10! rounded-tr-xl!"}>
                  <ChevronRightIcon width={17} height={17} />
                </Button>
              </TableMobileAction>
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

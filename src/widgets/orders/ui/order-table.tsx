import { ChevronRightIcon } from "@/shared/icons"
import { Badge, Button, Pagination, Table, TableBody, TableCell, TableCellActions, TableHead, TableHeader, TableNotFound, TableRow, TableSeparator } from "@/shared/ui"
import { formatDate, formatPrice } from "@/shared/utils";
import { LazyBlur } from "@/widgets/loading";
import { Link, useNavigate } from "@tanstack/react-router";
import React from "react";
import type { IOrder, IOrderQuery } from "@/entities/orders";
import { PAYMENT_METHODS_ENUM } from "@/shared/constants/payment-methods.constant";
import { ORDER_STATUS } from "@/shared/constants/order-status.constant";
import { OrderSort } from "./order-sort";
import { Avatar } from "@/entities/user";

interface OrderTableProps {
  orders?: IOrder[];
  isFetching: boolean;
  meta: PaginationMeta;
  query: IOrderQuery;
}

export const OrderTable = ({ orders, isFetching, meta, query}: OrderTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="mt-8 space-y-6">
      
      <OrderSort {...query} />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Дата</TableHead>
            <TableHead>Клиент</TableHead>
            <TableHead>Способ оплаты</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody className="relative">
          {isFetching && <LazyBlur />}
          {orders?.length ? 
            orders.map((ord, index) => (
              <React.Fragment key={index}>
                <TableRow
                  // onClick={() => navigate({ to: (ord.status === "pending" || ord.status === "open" || ord.status === "unpaid" ? `/orders/checkout/sell?booking_id=${ord.booking_ids}&order_id=${ord.id}` : `/orders/${ord.id}`) })}
                  onClick={() => navigate({ to: `/orders/${ord.id}` })}
                >
                  <TableCell className="flex-col justify-center items-start gap-0">
                    <p>{formatDate(ord.date)}</p>
                    <p className="opacity-50">{ord.time}</p>
                  </TableCell>
                  <TableCell className="flex-col items-start justify-center">
                    {ord.customer.id ? (
                      <>
                        <div className="flex items-center gap-2.5">
                          <Avatar size={"tiny"} avatar_url={ord.customer.avatar} name={ord.customer.full_name} id={ord.customer.id ?? "none"} />
                          <p>{ord.customer.full_name}</p>
                        </div>
                        <Link className="text-xss leading-3 text-primary" onClick={(e)=>e.stopPropagation()} to={`tel:${ord.customer.phone}`}>{ord.customer.phone}</Link>
                      </>
                    ) : (
                      <div className="flex items-center justify-center flex-1 w-full">-</div>
                    )}
                  </TableCell>
                  <TableCell>
                    {ord.payment_method ? (
                      <Badge variant={`${ord.payment_method}_p`}>
                        {(() => {
                          const method = PAYMENT_METHODS_ENUM[ord.payment_method];
                          const Icon = method.icon;
                          return (
                            <>
                              <Icon />
                              {method.label}
                            </>
                          );
                        })()}
                      </Badge>
                    ) : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge status={ord.status} fill={"solid"} className="px-2 py-0.5 text-xss! font-bold rounded-lg border-none text-white">
                        {(() => {
                          const status = ORDER_STATUS[ord.status];
                          const Icon = status.icon;
                          return (
                            <>
                              <Icon />
                              {status.label}
                            </>
                          );
                        })()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatPrice(ord.subtotal ?? ord.total)} ₽
                  </TableCell>
                  <TableCellActions>
                    <Link to={`${ord.id}`}>
                      <Button variant={"white"} size={"icon_40"} animation={"toggle_sm"}>
                        <ChevronRightIcon width={17} height={17} />
                      </Button>
                    </Link>
                  </TableCellActions>
                </TableRow>
                {index !== orders.length - 1 && <TableSeparator />}
              </React.Fragment>
            )) : (
              <TableRow>
                <TableNotFound>Нет данных</TableNotFound>
              </TableRow>
            )
          }
        </TableBody>
      </Table>

      {meta.total_pages > 1 && <Pagination {...meta} />}
    </div>
  )
}

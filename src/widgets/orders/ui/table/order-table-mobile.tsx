import { ChevronRightIcon } from "@/shared/icons"
import { Badge, Button, TableMobile, TableMobileAction, TableMobileBody, TableMobileCell, TableMobileRow, TableNotFound } from "@/shared/ui"
import { formatDate, formatPrice } from "@/shared/utils";
import { LazyBlur } from "@/widgets/loading";
import { Link, useNavigate } from "@tanstack/react-router";
import { PAYMENT_METHODS_ENUM } from "@/shared/constants/payment-methods.constant";
import { ORDER_STATUS } from "@/shared/constants/order-status.constant";
import { Avatar } from "@/entities/user";
import type { OrderTableProps } from "./types/props.type";

export const OrderTableMobile = ({ isFetching, orders }: OrderTableProps) => {
  const navigate = useNavigate();

  return (
    <TableMobile>
      <TableMobileBody>
        {isFetching && <LazyBlur />}
        {orders?.length ?
          orders.map((ord) => (
            <TableMobileRow key={ord.id} onClick={() => navigate({ to: `/orders/${ord.id}` })}>
              <TableMobileCell>
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
              </TableMobileCell>

              <TableMobileCell thead={"Дата"}>
                <div className="flex-col justify-center items-start gap-0">
                  <p>{formatDate(ord.date)}</p>
                  <p className="opacity-50">{ord.time}</p>
                </div>
              </TableMobileCell>

              <TableMobileCell thead={"Клиент"}>
                {ord.customer.id ? (
                  <div>
                    <div className="flex items-center gap-2">
                      <Avatar size={"tiny"} avatar_url={ord.customer.avatar} name={ord.customer.full_name} id={ord.customer.id ?? "none"} />
                      <p>{ord.customer.full_name}</p>
                    </div>
                    <Link
                      to={`tel:${ord.customer.phone}`}
                      className={"text-10 leading-3 text-primary opacity-70 hover:opacity-100 duration-150"}
                      onClick={(e) => e.stopPropagation()}
                    >{ord.customer.phone}</Link>
                  </div>
                ) : (
                  <div className="flex items-center justify-center flex-1 w-full">-</div>
                )}
              </TableMobileCell>

              <TableMobileCell thead={"Способ оплаты"}>
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
              </TableMobileCell>

              <TableMobileCell thead={"Цена"}>
                {formatPrice(ord.subtotal ?? ord.total)} ₽
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

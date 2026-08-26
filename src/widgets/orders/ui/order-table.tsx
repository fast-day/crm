import { useMediaQuery } from "react-responsive";
import { OrderTableDesktop } from "./table/order-table-desktop";
import { OrderTableMobile } from "./table/order-table-mobile";
import type { OrderTableProps } from "./table/types/props.type";

export const OrderTable = ({ orders, isFetching}: OrderTableProps) => {
  const isTablet = useMediaQuery({ query: "(max-width: 1100px)" });

  return (
    <>
      {isTablet ?
        <OrderTableMobile orders={orders} isFetching={isFetching} />
        :
        <OrderTableDesktop orders={orders} isFetching={isFetching} />
      }
    </>
  )
}

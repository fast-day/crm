import { useMediaQuery } from "react-responsive";
import { CustomerTableDesktop } from "./table/customer-table-desktop";
import { CustomerTableMobile } from "./table/customer-table-mobile";
import type { CustomerTableProps } from "./table/types/props.type";

export const CustomerTable = ({ customers, isFetching }: CustomerTableProps) => {
  const isTablet = useMediaQuery({ query: "(max-width: 1100px)" });

  return (
    <>
      {isTablet ?
        <CustomerTableMobile isFetching={isFetching} customers={customers} />
        :
        <CustomerTableDesktop isFetching={isFetching} customers={customers} />
      }
    </>
  )
}

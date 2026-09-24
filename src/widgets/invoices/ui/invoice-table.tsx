import { useMediaQuery } from "react-responsive";
import { InvoiceTableMobile } from "./table/invoice-table-mobile";
import { InvoiceTableDesktop } from "./table/invoice-table-desktop";
import type { InvoiceTableProps } from "./table/types/props.type";

export const InvoiceTable = ({ invoices, isFetching }: InvoiceTableProps) => {
  const isTablet = useMediaQuery({ query: "(max-width: 1100px)" });

  return (
    <>
      {isTablet ?
        <InvoiceTableMobile isFetching={isFetching} invoices={invoices} />
        :
        <InvoiceTableDesktop isFetching={isFetching} invoices={invoices} />
      }
    </>
  )
}

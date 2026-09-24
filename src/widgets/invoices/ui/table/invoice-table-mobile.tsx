import { Badge, TableMobile, TableMobileAction, TableMobileBody, TableMobileCell, TableMobileRow, TableNotFound } from "@/shared/ui"
import { formatDate, formatPrice } from "@/shared/utils";
import { LazyBlur } from "@/widgets/loading";
import type { IInvoice } from "@/entities/invoice";
import { INVOICE_TYPE } from "@/shared/constants";
import { InvoiceDownload } from "@/features/invoice";

interface InvoiceTableProps {
  invoices?: IInvoice[];
  isFetching: boolean;
}

export const InvoiceTableMobile = ({ invoices, isFetching }: InvoiceTableProps) => {
  return (
    <>
      <TableMobile>
        <TableMobileBody>
          {isFetching && <LazyBlur />}
          {invoices?.length ?
            invoices.map((invoice) => (
              <TableMobileRow key={invoice.id}>
                <TableMobileCell thead={"№"}>
                    {invoice.tag}
                </TableMobileCell>

                <TableMobileCell thead={"Заказ №"}>
                  {invoice.order_tag}
                </TableMobileCell>

                <TableMobileCell thead={"Выдан"}>
                  <p>{formatDate(invoice.date)}</p>
                </TableMobileCell>

                <TableMobileCell thead={"Статус"}>
                  <Badge status={invoice.type} fill={"solid"}>
                    {(() => {
                      const method = INVOICE_TYPE[invoice.type];
                      const Icon = method.icon;
                      return (
                        <>
                          <Icon />
                          {method.label}
                        </>
                      );
                    })()}
                  </Badge>
                </TableMobileCell>

                <TableMobileCell thead={"Итого"}>
                    {formatPrice(invoice.amount)} ₽
                </TableMobileCell>

                <TableMobileAction>
                  <InvoiceDownload invoice_id={invoice.id} tag={invoice.tag} />
                </TableMobileAction>
              </TableMobileRow>
            )) : (
              <TableMobileRow>
                <TableNotFound>Нет данных</TableNotFound>
              </TableMobileRow>
            )}
        
        </TableMobileBody>
      </TableMobile>
    </>
  )
}

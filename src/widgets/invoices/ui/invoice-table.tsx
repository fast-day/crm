import { Badge, Table, TableBody, TableCell, TableCellActions, TableHead, TableHeader, TableNotFound, TableRow, TableSeparator } from "@/shared/ui"
import { formatDate, formatPrice } from "@/shared/utils";
import { LazyBlur } from "@/widgets/loading";
import React from "react";
import type { IInvoice } from "@/entities/invoice";
import { InvoiceDownload } from "@/features/invoice";
import { INVOICE_TYPE } from "@/shared/constants";

interface InvoiceTableProps {
  invoices?: IInvoice[];
  isFetching: boolean;
}

export const InvoiceTable = ({ invoices, isFetching }: InvoiceTableProps) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>№</TableHead>
            <TableHead>Заказ №</TableHead>
            <TableHead>Выдан</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Итого</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody className="relative">
          {isFetching && <LazyBlur />}
          {invoices?.length ? 
            invoices.map((invoice, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell className="flex-col justify-center items-start gap-0">
                    {invoice.tag}
                  </TableCell>
                  <TableCell className="flex-col items-start justify-center">
                    {invoice.order_tag}
                  </TableCell>
                  <TableCell className="flex-col items-start justify-center">
                    <p>{formatDate(invoice.date)}</p>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    {formatPrice(invoice.amount)} ₽
                  </TableCell>
                  <TableCellActions>
                    <InvoiceDownload invoice_id={invoice.id} tag={invoice.tag} />
                  </TableCellActions>
                </TableRow>
                {index !== invoices.length - 1 && <TableSeparator />}
              </React.Fragment>
            )) : (
              <TableRow>
                <TableNotFound>Нет данных</TableNotFound>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </>
  )
}

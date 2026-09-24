import type { IInvoice } from "@/entities/invoice";

export interface InvoiceTableProps {
  invoices?: IInvoice[];
  isFetching: boolean;
}

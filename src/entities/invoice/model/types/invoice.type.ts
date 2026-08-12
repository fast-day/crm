export interface IInvoice {
  id: string;
  order_id: string;
  order_tag: string;
  tag: string;
  type: InvoiceType;
  amount: number;
  status: InvoiceStatusType;
  date: string;
}

export interface IInvoiceQuery extends PaginationQuery {
  status?: InvoiceStatusType;
}

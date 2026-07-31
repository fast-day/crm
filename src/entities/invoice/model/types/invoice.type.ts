export interface IInvoice {
  id: string;
  tag: string;
  amount: number;
  status: InvoiceStatusType;
  type: InvoiceType;
  date: string;
}
import type { IInvoice } from "@/entities/invoice";
import type { IOrder } from "@/entities/orders";

export type TransactionType = "earning" | "refund_deduction" | "expense";

export interface TransactionResponse {
  total_amount: number;
  transactions: ITransaction[];
}

export interface ITransaction {
  id: string;
  tag: string;
  type: TransactionType;
  amount: number;
  description: string | null;
  category: {
    id: number | null;
    name: string | null;
    icon: string;
    mark: MarkType;
  }
  date: string;
  time: string;
}

export interface ITransactionQuery extends PaginationQuery {
  start_date: string;
  end_date: string;
  type?: TransactionType;
  category_id?: string;
}

export interface ITransactionCreateCredentials extends Partial<Omit<ITransaction, "date" | "time" | "category" | "tag" | "id">> {
  category_id?: number;
}

export interface ITransactionDetail extends ITransaction {
  invoice: Omit<IInvoice, "order_id" | "order_tag"> | null;
  order: Omit<IOrder, "booking_ids" | "customer"> | null;
}

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
  invoice: null;
  order: null;
}

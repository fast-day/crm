export type TransactionCategoryType = "service" | "refund" | "custom";

export interface ITransactionCategory {
  id: number,
  name: string,
  mark: MarkType;
  type: TransactionCategoryType;
}

export interface ITransactionCategoryQuery {
  search?: string;
  mark?: MarkType;
}

export type TransactionCategoryCredentials = Partial<Omit<ITransactionCategory, "id" | "type">>;

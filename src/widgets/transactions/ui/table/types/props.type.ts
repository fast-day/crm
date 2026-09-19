import type { ITransaction } from "@/entities/transactions";

export interface OrderTableProps {
  transactions?: ITransaction[];
  isFetching: boolean;
}

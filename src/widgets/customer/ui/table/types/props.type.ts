import type { ICustomers } from "@/entities/customers";

export interface CustomerTableProps {
  customers?: ICustomers[];
  isFetching: boolean;
}

import type { IOrder } from "@/entities/orders";

export interface OrderTableProps {
  orders?: IOrder[];
  isFetching: boolean;
}

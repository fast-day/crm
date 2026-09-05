import type { IServices } from "@/entities/services";

export interface ServicesTableProps {
  services?: IServices[];
  isFetching: boolean;
}

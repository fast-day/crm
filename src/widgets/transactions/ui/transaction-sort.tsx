import { Route } from "@/app/routes/_app/_layout/orders/transactions";
import type { ITransactionQuery, TransactionType } from "@/entities/transactions";
import { TransactionDateFilter } from "@/features/transactions";
import { CloseIcon } from "@/shared/icons";
import { Button, SortWrapper } from "@/shared/ui"
import { cn } from "@/shared/utils";
import { useNavigate } from "@tanstack/react-router";
import { endOfMonth, isSameDay, isSameMonth, startOfMonth } from "date-fns";

const variant = ["all", "earning", "refund_deduction", "expense"] as (TransactionType | "all")[];

const TRANSACTION_TYPE: Record<TransactionType | "all", string> = {
  "all": "Все",
  "earning": "Доход от услуги",
  "refund_deduction": "Возврат средств",
  "expense": "Расход",
};

export const TransactionSort = ({ type, start_date, end_date, category_id }: ITransactionQuery) => {
  const navigate = useNavigate({ from: Route.fullPath });
  
  const handleChange = (name: "type", value: TransactionType | "all" ) => {
    navigate({
      search: (p: ITransactionQuery) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [name]: _, ...rest } = p;
        return value === "all" ? { ...rest } : { ...rest, [name]: value, page: 1 };
      }
    });
  }

  const isFullMonth =
    isSameMonth(start_date, end_date) &&
    isSameDay(start_date, startOfMonth(start_date)) &&
    isSameDay(end_date, endOfMonth(end_date));

  const clearFilter = () => {
    navigate({ search: null });
  }

  return (
    <div>
      <div className="flex 1100:items-center 1100:gap-4 gap-3 1100:flex-row flex-col">
        <SortWrapper>
          {variant.map((v, idx) => (
            <Button
              key={idx}
              variant={"action"}
              className={cn((v === "all" ? !type : type === v) ? "bg-white" : "")}
              size={"size_40"}
              onClick={() => handleChange("type", v)}
            >{TRANSACTION_TYPE[v]}</Button>
          ))}
        </SortWrapper>

        <div className="flex items-center gap-2.5">
          <TransactionDateFilter start_date={start_date} end_date={end_date} />
          {(!isFullMonth || category_id) && (
            <Button
              type={"button"}
              size={"icon_36"}
              variant={"red"}
              onClick={clearFilter}
            >
              <CloseIcon width={20} height={20} />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

import { Route } from "@/app/routes/_app/_layout/orders/transactions";
import type { ITransactionQuery, TransactionType } from "@/entities/transactions";
import { Button, CalendarRange, SortWrapper } from "@/shared/ui"
import { cn } from "@/shared/utils";
import { useNavigate } from "@tanstack/react-router";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";

const variant = ["all", "earning", "refund_deduction", "expense"] as (TransactionType | "all")[];

const TRANSACTION_TYPE: Record<TransactionType | "all", string> = {
  "all": "Все",
  "earning": "Доход от услуги",
  "refund_deduction": "Возврат средств",
  "expense": "Расход",
};

export const TransactionSort = ({ type, start_date, end_date }: ITransactionQuery) => {
  const navigate = useNavigate({ from: Route.fullPath });
  const [range, setRange] = useState<DateRange | undefined>(() => ({
    from: start_date ? new Date(`${start_date}T00:00:00`) : startOfMonth(new Date()),
    to: end_date ? new Date(`${end_date}T00:00:00`) : endOfMonth(new Date()),
  }));

  useEffect(() => {
    setRange({
      from: start_date ? new Date(`${start_date}T00:00:00`) : startOfMonth(new Date()),
      to: end_date ? new Date(`${end_date}T00:00:00`) : endOfMonth(new Date()),
    });
  }, [start_date, end_date]);
  
  const handleChange = (name: "type", value: TransactionType | "all" ) => {
    navigate({
      search: (p: ITransactionQuery) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [name]: _, ...rest } = p;
        return value === "all" ? { ...rest } : { ...rest, [name]: value, page: 1 };
      }
    });
  }

  const handleDateApply = (r: DateRange) => {
    navigate({
      search: (p: ITransactionQuery) => ({
        ...p,
        start_date: format(r.from!, "yyyy-MM-dd"),
        end_date: format(r.to!, "yyyy-MM-dd"),
      }),
    });
  };

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

        <div>
          <CalendarRange
            range={range}
            apply={handleDateApply}
          />
        </div>
      </div>
    </div>
  )
}

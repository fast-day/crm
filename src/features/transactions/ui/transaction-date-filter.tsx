import { Route } from "@/app/routes/_app/_layout/orders/transactions";
import type { ITransactionQuery } from "@/entities/transactions";
import { CalendarRange } from "@/shared/ui";
import { useNavigate } from "@tanstack/react-router";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";

interface ITransactionDateFilterProps {
  start_date?: string;
  end_date?: string;
}

export const TransactionDateFilter = ({ start_date, end_date }: ITransactionDateFilterProps) => {
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
    <CalendarRange
      range={range}
      apply={handleDateApply}
    />
  )
}

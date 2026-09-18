import { Route } from "@/app/routes/_app/_layout/orders/transactions";
import type { ITransactionQuery, TransactionType } from "@/entities/transactions";
import { Button, SortWrapper } from "@/shared/ui"
import { cn } from "@/shared/utils";
import { useNavigate } from "@tanstack/react-router";

const variant = ["all", "earning", "refund_deduction", "expense"] as (TransactionType | "all")[];

const TRANSACTION_TYPE: Record<TransactionType | "all", string> = {
  "all": "Все",
  "earning": "Доход от услуги",
  "refund_deduction": "Возврат средств",
  "expense": "Расход",
};

export const TransactionSort = ({ type }: ITransactionQuery) => {
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
  return (
    <div>
      <div className="flex items-center justify-between">
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

        {/* <Search
          placeholder={"Поиск по имени и номеру телефона"}
          value={searchValue}
          onValueChange={setSearchValue}
        /> */}
      </div>
    </div>
  )
}

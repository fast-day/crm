import { Route } from "@/app/routes/_app/_layout/orders";
import type { IOrderQuery } from "@/entities/orders";
import { Button } from "@/shared/ui"
import { cn } from "@/shared/utils";
import { SortWrapper } from "@/widgets/sort";
import { useNavigate } from "@tanstack/react-router";

const variant = ["all", "cancelled", "paid", "unpaid", "refund"] as Exclude<OrderStatusType, "pending" | "open">[] | "all"[];

const ORDER_STATUS: Record<Exclude<OrderStatusType, "pending" | "open"> | "all", string> = {
  "all": "Все",
  "unpaid": "Не оплачены",
  "paid": "Оплачены",
  "cancelled": "Отмененные",
  "refund": "Возвращенные",
};

export const OrderSort = ({ status }: IOrderQuery) => {
  const navigate = useNavigate({ from: Route.fullPath });
  
  const handleChange = (name: "status", value: OrderStatusType | "all" ) => {
    navigate({
      search: (p: IOrderQuery) => {
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
              className={cn((v === "all" ? !status : status === v) ? "bg-white" : "")}
              size={"size_40"}
              onClick={() => handleChange("status", v)}
            >{ORDER_STATUS[v]}</Button>
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

import { setBookingCustomer } from "@/entities/booking"
import { useCompanyCustomersQuery } from "@/entities/directories";
import { Avatar } from "@/entities/user";
import { useAppDispatch } from "@/shared/hooks"
import { Button } from "@/shared/ui";
import { SelectItem } from "@/shared/ui/select/ui/select-custom";
import { useNavigate } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

export const SelectCustomerContent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data, isLoading, isFetching } = useCompanyCustomersQuery(undefined, { refetchOnMountOrArgChange: true });

  return (
    <>
      {(isLoading || isFetching) ? (
          <div className="p-4 text-center text-sm opacity-60">Загрузка...</div>
      ) : (
        data?.length ? data.map((customer, idx) => (
          <SelectItem
            key={idx}
            value={{
              value: customer.customer_attributes.first_name,
              label: customer.customer_attributes.first_name,
              avatar: { id: customer.id, name: customer.customer_attributes.first_name, avatar_url: customer.customer_attributes.avatar }
            }}
            onChange={() => dispatch(setBookingCustomer(customer))}
            className="flex items-center gap-2 rounded-none"
          >
            <Avatar size={"small"} id={customer.id} avatar_url={customer.customer_attributes.avatar} name={customer.customer_attributes.full_name} />
            <div>
              <div className="text-xs leading-5 font-medium">{customer.customer_attributes.full_name}</div>
              <div className="text-11 leading-3">{customer.customer_attributes.phone}</div>
            </div>
          </SelectItem>
        )) : (
          <SelectItem
            onChange={() => navigate({ to: "/customers/create?redirect=/bookings/create" })}
            className="p-2.5"
            value={{
                value: "create",
                label: "create",
                avatar: undefined
            }}
          >
            <Button
              type={"button"}
              variant={"dashed"}
              size={"size_48"}
              className={"w-full"}
              iconLeft={<PlusIcon width={20} height={20} />}
            >Добавить клиента</Button>
          </SelectItem>
        )
      )}
    </>
  )
}

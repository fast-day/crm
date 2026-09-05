import {type IDirectoryCustomer } from "@/entities/directories";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/shared/ui/select/ui/select-custom";
import { SelectCustomerContent } from "./select-customer-content";

interface BookingSelectCustomerProps {
  customer: IDirectoryCustomer | null;
}

export const BookingSelectCustomer = ({ customer }: BookingSelectCustomerProps) => {
  return (
    <Select value={{
      value: customer?.customer_attributes.full_name ?? "",
      label: customer?.customer_attributes.full_name ?? "",
      avatar: customer ? { id: customer.id, name: customer.customer_attributes.first_name, avatar_url: customer.customer_attributes.avatar } : undefined,
    }}>
      <SelectTrigger className="h-16">
        <SelectValue placeholder="Клиент не выбран" />
      </SelectTrigger>
      <SelectContent className="p-0">
        <SelectCustomerContent />
      </SelectContent>
    </Select>
  )
}

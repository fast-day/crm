import type { IDirectoryCustomer } from "@/entities/directories"
import { Copyable } from "@/features/copyable";
import { CardContentLabel, CardContentLabelDescription, CardContentLabelTitle } from "@/shared/ui"
import { formatPrice } from "@/shared/utils";

interface BookingSelectCustomerInfoProps {
  customer: IDirectoryCustomer;
}

export const BookingSelectCustomerInfo = ({ customer }: BookingSelectCustomerInfoProps) => {
  return (
  <div className="space-y-5">
    <div className="grid grid-cols-3 gap-2.5">
      <CardContentLabel>
        <CardContentLabelTitle>Посещений</CardContentLabelTitle>
        <CardContentLabelDescription>{customer.visit_total}</CardContentLabelDescription>
      </CardContentLabel>
      <CardContentLabel>
        <CardContentLabelTitle>Записей</CardContentLabelTitle>
        <CardContentLabelDescription>{customer.bookings_count}</CardContentLabelDescription>
      </CardContentLabel>
      <CardContentLabel>
        <CardContentLabelTitle>Оплачено</CardContentLabelTitle>
        <CardContentLabelDescription>{formatPrice(customer.bookings_count)} ₽</CardContentLabelDescription>
      </CardContentLabel>
    </div>

    <CardContentLabel>
      <CardContentLabelTitle>Номер телефона</CardContentLabelTitle>
      <CardContentLabelDescription>
        <Copyable text={customer.customer_attributes.phone}/>
      </CardContentLabelDescription>
    </CardContentLabel>

    <CardContentLabel>
      <CardContentLabelTitle>Электронная почта</CardContentLabelTitle>
      <CardContentLabelDescription>
        <Copyable text={customer.customer_attributes.email}/>
      </CardContentLabelDescription>
    </CardContentLabel>
  </div>
  )
}

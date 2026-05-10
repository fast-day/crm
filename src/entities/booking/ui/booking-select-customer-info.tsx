import type { IDirectoryCustomer } from "@/entities/directories"
import { Copyable } from "@/features/copyable";
import { CardContentLabel, CardContentLabelDescription, CardContentLabelTitle } from "@/shared/ui"

interface BookingSelectCustomerInfoProps {
  customer: IDirectoryCustomer;
}

export const BookingSelectCustomerInfo = ({ customer }: BookingSelectCustomerInfoProps) => {
  return (
  <div className="space-y-5">
    <CardContentLabel>
      <CardContentLabelTitle>Посещений</CardContentLabelTitle>
      <CardContentLabelDescription>{customer.bookings_count}</CardContentLabelDescription>
    </CardContentLabel>

    <CardContentLabel>
      <CardContentLabelTitle>Номер телефона</CardContentLabelTitle>
      <CardContentLabelDescription>
        <Copyable text={customer.phone}/>
      </CardContentLabelDescription>
    </CardContentLabel>

    <CardContentLabel>
      <CardContentLabelTitle>Электронная почта</CardContentLabelTitle>
      <CardContentLabelDescription>
        <Copyable text={customer.email}/>
      </CardContentLabelDescription>
    </CardContentLabel>
  </div>
  )
}

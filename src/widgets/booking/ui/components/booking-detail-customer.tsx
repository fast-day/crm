import { BookingSelectCustomerInfo } from "@/entities/booking";
import type { IDirectoryCustomer } from "@/entities/directories";
import { Avatar } from "@/entities/user"
import { Card, CardContent, CardContentLabel, CardContentLabelDescription, CardContentLabelTitle, CardDescription, CardHeader, CardTitle } from "@/shared/ui"
import { Link } from "@tanstack/react-router"

interface IBookingDetailCustomerProps {
  customer: IDirectoryCustomer;
}

export const BookingDetailCustomer = ({ customer }: IBookingDetailCustomerProps) => {
  return (
    <Card>
      <CardHeader className="p-0">
        <Link to={`/customers/${customer.customer_attributes.profile_id}`} className="flex flex-row items-center gap-4 p-6 hover:bg-card rounded-t-3xl duration-200">
          <div className="relative">
            <Avatar size={"xl"} id={customer.customer_attributes.profile_id ?? "none"} name={customer.customer_attributes.full_name} avatar_url={customer.customer_attributes.avatar} />
          </div>
          <div className="flex justify-between gap-4 flex-1">
            <div className="space-y-0.5 flex-1">
              <CardTitle className="capitalize">{customer.customer_attributes.full_name}</CardTitle>
              <CardDescription className="opacity-50">Клиент</CardDescription>
            </div>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="space-y-5">
        <BookingSelectCustomerInfo customer={customer} />

        <CardContentLabel>
          <CardContentLabelTitle>Дата рождения</CardContentLabelTitle>
          <CardContentLabelDescription>{customer.customer_attributes.birthday ?? "-"}</CardContentLabelDescription>
        </CardContentLabel>
      </CardContent>
    </Card>
  )
}

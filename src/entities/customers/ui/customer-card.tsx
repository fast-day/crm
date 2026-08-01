import { Avatar } from "@/entities/user"
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui"
import { Link } from "@tanstack/react-router"
import type { CustomerProfile } from "../model/types/customer.type"

export const CustomerCard = ({ id, full_name, avatar, phone }: Omit<CustomerProfile, "birthday">) => {
  return (
    <Card>
      <CardHeader className="p-0">
        <Link to={`/customers/${id}`} className="flex flex-row items-center gap-2.5 p-4">
          <div className="relative">
            <Avatar size={"large"} id={id} name={full_name} avatar_url={avatar} />
          </div>
          <div>
            <CardTitle className="capitalize text-base">{full_name}</CardTitle>
            <CardDescription className="opacity-50 mt-0 leading-3 text-xss">{phone}</CardDescription>
          </div>
        </Link>
      </CardHeader>
    </Card>
  )
}

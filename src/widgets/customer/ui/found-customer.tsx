import type { ICheckCustomer } from "@/entities/customers"
import { Avatar } from "@/entities/user"
import { ChevronRightIcon } from "@/shared/icons"
import { Button, Card, CardContent } from "@/shared/ui"
import { Link } from "@tanstack/react-router"

export const FoundCustomer = ({ customer_id, profile }: ICheckCustomer) => {
  return (
    <Link to={`/customers/${customer_id}`}>
      <Card>
        <CardContent className="flex items-center gap-2.5">
            <Avatar size={"lg"} id={profile.id ?? "none"} name={profile.full_name ?? ""} avatar_url={profile.avatar} />
            <div className="flex-1 space-y-0.5">
              <p className="text-base font-semibold">{profile.full_name}</p>
              <p className="text-xs opacity-50">{profile.phone}</p>
            </div>
            <Button variant={"white"} size={"icon_40"} animation={"toggle_sm"}>
              <ChevronRightIcon width={17} height={17} />
            </Button>
        </CardContent>
      </Card>
    </Link>
  )
}

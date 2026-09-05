import type { IService } from "@/entities/services"
import { Avatar } from "@/entities/user"
import { markClasses } from "@/shared/constants";
import { AddFillIcon } from "@/shared/icons";
import { Button } from "@/shared/ui";
import { Card, CardContent, CardContentLabel, CardContentLabelDescription, CardContentLabelTitle, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card/ui/card"
import { cn, formatPrice } from "@/shared/utils";
import { PageDetailWrapper } from "@/widgets/layout";
import { useNavigate } from "@tanstack/react-router";

interface ServiceDetailProps {
  service: IService;
}

export const ServiceDetails = ({ service }: ServiceDetailProps) => {
  const navigate = useNavigate();

  const createNewBooking = () => {
    navigate({ to: "/bookings/create" });
  }
  
  return (
    <PageDetailWrapper>
      <div className="col-span-3 space-y-8">
        <Card>
          <CardHeader className="flex-row items-center gap-4">
            <div className="relative">
              <Avatar size={"xl"} id={service.id} name={service.name} avatar_url={service.avatar} />
              <div className={cn("absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full",  markClasses[service.mark ?? "red"])} />
            </div>
            <div className="flex justify-between gap-4 flex-1">
              <div className="space-y-0.5 flex-1">
                <CardTitle className="capitalize">{service.name}</CardTitle>
                <CardDescription className="opacity-50">{service.category || "Без категории"}</CardDescription>
              </div>
              <div className="font-bold text-xl flex">{formatPrice(service.price)} ₽</div>
            </div>
          </CardHeader>
          <CardContent className="grid max-w-85 gap-2.5 pt-0">
            <Button onClick={createNewBooking} size={"size_54"} variant={"white"} animation={"toggle"} className="font-medium" iconLeft={<AddFillIcon width={22} height={22}/>}>Новое бронирование</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Цена</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 pt-0">

            <CardContentLabel>
              <CardContentLabelTitle>Цена от</CardContentLabelTitle>
              <CardContentLabelDescription>{formatPrice(service.price)} ₽</CardContentLabelDescription>
            </CardContentLabel>

            <CardContentLabel>
              <CardContentLabelTitle>Себестоимость</CardContentLabelTitle>
              <CardContentLabelDescription>{service.prices.cost_price ? `${formatPrice(service.prices.cost_price)} ₽` : "-" }</CardContentLabelDescription>
            </CardContentLabel>

          </CardContent>
        </Card>
      </div>
    </PageDetailWrapper>
  )
}

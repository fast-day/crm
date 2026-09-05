import { Avatar } from "@/entities/user";
import { Button, TableMobile, TableMobileAction, TableMobileBody, TableMobileCell, TableMobileRow, TableNotFound } from "@/shared/ui"
import { useNavigate } from "@tanstack/react-router";
import { ChevronRightIcon } from "lucide-react";
import type { ServicesTableProps } from "./types/props.type";
import { LazyBlur } from "@/widgets/loading";
import { PaletteIcon } from "@/shared/icons";
import { cn, formatPrice, minuteFormat } from "@/shared/utils";
import { markClasses } from "@/shared/constants";

export const ServicesTableMobile = ({ services, isFetching }: ServicesTableProps) => {
  const navigate = useNavigate();

  return (
    <TableMobile>
      <TableMobileBody>
        {isFetching && <LazyBlur />}
        {services?.length ?
          services.map((service) => (
            <TableMobileRow key={service.id} onClick={() => navigate({ to: `/business/services/${service.id}` })}>
              <TableMobileCell thead={"Название"}>
                <div className="flex items-center gap-2.5">
                  <Avatar 
                    size={"small"} 
                    avatar_url={service.avatar} 
                    name={service.name} 
                    id={service.id}
                    className={"bg-black/15! overflow-visible!"}
                    isIcon
                    icon={<PaletteIcon width={20} height={20} />}
                  >
                    <div className={cn("absolute bottom-0 right-0 w-2 h-2 rounded-full",  markClasses[service.mark ?? "red"])} />
                  </Avatar>
                  <div>
                    <p>{service.name}</p>
                    <p className="text-11 leading-3 opacity-50 mt-px font-normal">{service.category?.length ? service.category : "Без категории"}</p>
                  </div>
                </div>
              </TableMobileCell>

              <TableMobileCell thead={"Цена"}>
                {formatPrice(service.price)} ₽
              </TableMobileCell>

              <TableMobileCell thead={"Длительность"}>
                {minuteFormat(service.duration)}
              </TableMobileCell>

              <TableMobileAction>
                <Button variant={"white"} size={"icon_32"} animation={"toggle_sm"} className={"rounded-10! rounded-tr-xl!"}>
                  <ChevronRightIcon width={17} height={17} />
                </Button>
              </TableMobileAction>
            </TableMobileRow>
          )) : (
            <TableMobileRow>
              <TableNotFound>Нет данных</TableNotFound>
            </TableMobileRow>
          )}
      
      </TableMobileBody>
    </TableMobile>
  )
}

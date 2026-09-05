import { ChevronRightIcon } from "@/shared/icons"
import { Badge, Button, TableMobile, TableMobileAction, TableMobileBody, TableMobileCell, TableMobileRow, TableNotFound } from "@/shared/ui"
import { formatDate, formatPrice } from "@/shared/utils";
import { LazyBlur } from "@/widgets/loading";
import { Link, useNavigate } from "@tanstack/react-router";
import { Avatar } from "@/entities/user";
import { BOOKING_STATUS } from "@/shared/constants";
import type { CustomerBookingTableProps } from "./types/props.type";

export const CustomerBookingTableMobile = ({ isFetching, bookings }: CustomerBookingTableProps) => {
  const navigate = useNavigate();
  return (
    <TableMobile>
      <TableMobileBody>
        {isFetching && <LazyBlur />}
        {bookings?.length ?
          bookings.map((booking) => (
            <TableMobileRow key={booking.id} onClick={() => navigate({ to: `/bookings/${booking.id}` })}>
              <TableMobileCell>
                  <Badge variant={`${booking.status}_b`}>{BOOKING_STATUS[booking.status]}</Badge>
              </TableMobileCell>

              <TableMobileCell thead={"Дата"}>
                <div>
                  <p className="font-semibold">{formatDate(booking.date)}</p>
                  <div className="flex items-center text-sm mt-0.5 opacity-80">
                    <p>{booking.start_time}</p>
                    <span> - </span>
                    <p>{booking.end_time}</p>
                  </div>
                </div>
              </TableMobileCell>

              <TableMobileCell thead={"Услуга"}>
                  {booking.booking_services.length > 0 ? (
                    <div className="flex items-center gap-2.5">
                      {booking.booking_services.slice(0,1).map((service, idx) => (
                        <Link to={`/business/services/${service.service.service_id}`} onClick={(e)=>e.stopPropagation()} key={idx} className="flex items-center gap-2.5">
                          <Avatar size={"tiny"} avatar_url={service.service.avatar} name={service.service.name} id={service.service.service_id} />
                          <p className="leading-4">{service.service.name}</p>
                        </Link>
                      ))}
                      {booking.booking_services.length > 1 && (
                        <div className="text-11 font-medium rounded-md leading-2.5 bg-border w-5 h-5 flex items-center justify-center">+{booking.booking_services.length - 1}</div>
                      )}
                    </div>
                  ) : ( <div className="flex items-center w-full flex-1">-</div> )}
              </TableMobileCell>

              <TableMobileCell thead={"Сотрудник"}>
                <div className="flex items-center gap-2.5">
                  <Avatar size={"tiny"} avatar_url={booking.booking_services[0].user.avatar} name={booking.booking_services[0].user.full_name} id={booking.booking_services[0].user.user_id} />
                  <p className="leading-4">{booking.booking_services[0].user.full_name}</p>
                </div>
              </TableMobileCell>

              <TableMobileCell thead={"Цена"}>
                  {formatPrice(booking.subtotal ?? booking.booking_services.reduce((sum, s) => sum + s.booking_service_price, 0))} ₽
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

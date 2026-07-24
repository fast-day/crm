import type { IBooking, IBookingQuery } from "@/entities/booking";
import { Avatar } from "@/entities/user";
import { BOOKING_STATUS } from "@/shared/constants";
import { ChevronRightIcon } from "@/shared/icons"
import { Badge, Button, Pagination, Table, TableBody, TableCell, TableCellActions, TableHead, TableHeader, TableNotFound, TableRow, TableSeparator } from "@/shared/ui"
import { formatPrice } from "@/shared/utils";
import { LazyBlur } from "@/widgets/loading";
import { Link, useNavigate } from "@tanstack/react-router";
import React from "react";
import { BookingSort } from "./booking-sort";

interface BookingTableProps {
  bookings?: IBooking[];
  isFetching: boolean;
  profileId?: string;
  meta: PaginationMeta;
  query: IBookingQuery;
}

export const BookingTable = ({ bookings, isFetching, meta, query}: BookingTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="mt-8 space-y-6">
      
      <BookingSort {...query} />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Дата</TableHead>
            <TableHead>Услуга</TableHead>
            <TableHead>Клиент</TableHead>
            <TableHead>Сотрудник</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody className="relative">
          {isFetching && <LazyBlur />}
          {bookings?.length ? 
            bookings.map((booking, index) => (
              <React.Fragment key={index}>
                <TableRow onClick={() => navigate({ to: `${booking.id}` })}>
                  <TableCell>
                    <div>
                      -
                      {/* <p className="font-semibold">{formatDate(booking.date)}</p> */}
                      {/* <div className="flex items-center text-sm mt-0.5 opacity-80"> */}
                        {/* <p>{booking.start_time}</p> */}
                        {/* <span> - </span> */}
                        {/* <p>{booking.end_time}</p> */}
                      {/* </div> */}
                      {/* <span className="text-xss leading-3 opacity-80">{minuteFormat(booking.service.duration)}</span> */}
                    </div>
                  </TableCell>
                  <TableCell>
                    {booking.booking_services.length > 0 ? (
                      <>
                        {booking.booking_services.slice(0,1).map((service, idx) => (
                          <Link to={`/business/services/${service.service.service_id}`} onClick={(e)=>e.stopPropagation()} key={idx} className="flex items-center gap-2.5">
                            <Avatar size={"tiny"} avatar_url={service.service.avatar} name={service.service.name} id={service.service.service_id} />
                            <p className="leading-4">{service.service.name}</p>
                          </Link>
                        ))}
                        {booking.booking_services.length > 1 && (
                          <div className="text-11 font-medium rounded-md leading-2.5 bg-border w-5 h-5 flex items-center justify-center">+{booking.booking_services.length - 1}</div>
                        )}
                      </>
                    ) : ( <div className="flex items-center w-full flex-1">-</div> )}
                  </TableCell>
                  <TableCell className="flex-col items-start justify-center">
                    <div className="flex items-center gap-2.5">
                      <Avatar size={"tiny"} avatar_url={booking.customer.avatar} name={booking.customer.full_name} id={booking.customer.id} />
                      <p>{booking.customer.full_name}</p>
                    </div>
                    <Link className="text-xss leading-3 text-primary" onClick={(e)=>e.stopPropagation()} to={`tel:${booking.customer.phone}`}>{booking.customer.phone}</Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar size={"tiny"} avatar_url={booking.booking_services[0].user.avatar} name={booking.booking_services[0].user.full_name} id={booking.booking_services[0].user.user_id} />
                      <p className="leading-4">{booking.booking_services[0].user.full_name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatPrice(booking.subtotal ?? booking.booking_services.reduce((sum, s) => sum + s.booking_service_price, 0))} ₽
                  </TableCell>
                  <TableCell>
                    <Badge variant={`${booking.status}_b`}>{BOOKING_STATUS[booking.status]}</Badge>
                  </TableCell>
                  <TableCellActions>
                    <Button variant={"white"} size={"icon_40"} animation={"toggle_sm"}>
                      <ChevronRightIcon width={17} height={17} />
                    </Button>
                  </TableCellActions>
                </TableRow>
                {index !== bookings.length - 1 && <TableSeparator />}
              </React.Fragment>
            )) : (
              <TableRow>
                <TableNotFound>Нет данных</TableNotFound>
              </TableRow>
            )
          }
        </TableBody>
      </Table>

      {meta.total_pages > 1 && <Pagination {...meta} />}
    </div>
  )
}

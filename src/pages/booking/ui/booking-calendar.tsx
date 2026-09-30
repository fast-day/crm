import { accountSelector } from "@/entities/account";
import { useGetCalendarBookingsQuery, type IBookingQuery } from "@/entities/booking"
import type { TCalendarView } from "@/entities/calendar";
import { Can } from "@/features/auth";
import { AddIcon } from "@/shared/icons";
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { BookingCalendar, BookingEmpty } from "@/widgets/booking";
import { PageTableWrapper, RequestError } from "@/widgets/layout";
import { AppLoading, TableLoading } from "@/widgets/loading";
import { skipToken } from "@reduxjs/toolkit/query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useSelector } from "react-redux";

export interface BookingProps {
  query: IBookingQuery & PaginationQuery;
}

export const BookingCalendarPage = ({ query }: BookingProps) => {
  const { location, account } = useSelector(accountSelector);

  const [view, setView] = useState<TCalendarView>(localStorage.getItem("booking_calendar_view") as TCalendarView ?? "week");

  const { data, isLoading, isError, isSuccess, isFetching } = useGetCalendarBookingsQuery(
    location && account?.has_bookings ? { ...query, location_id: location.uuid } : skipToken,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  if (!location) return <AppLoading />;

  const content = !account?.has_bookings ? (
    <BookingEmpty />
  ) : isLoading ? (
    <TableLoading rows={5} />
  ) : isError ? (
    <RequestError />
  ) : isSuccess ? (
    <>
      <BookingCalendar
        view={view}
        onViewChange={setView}
        isFetching={isFetching}
        bookings={data.bookings}
        intervals={data.intervals}
      />
    </>
  ) : (
    <BookingEmpty />
  );

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Записи</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Can permission={"booking:create"}>
            <Link to={"/bookings/create"}>
              <Button 
                size={"size_44"}
                animation={"toggle"}
                className={"text-sm font-bold 1100:w-fit w-11 1100:px-6 px-0"}
                classNameChild={"1100:block hidden"}
                iconLeft={<AddIcon width={21} height={21}/>}
              >Новая запись</Button>
            </Link>
          </Can>
        </PageHeaderActions>
      </PageHeader>

      <PageTableWrapper>
        {content}
      </PageTableWrapper>
    </>
  )
}

import { accountSelector } from "@/entities/account";
import { useGetBookingsQuery, type IBookingQuery } from "@/entities/booking"
import { Can } from "@/features/auth";
import { AddIcon } from "@/shared/icons";
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { BookingEmpty, BookingTable } from "@/widgets/booking";
import { RequestError } from "@/widgets/layout";
import { AppLoading, TableLoading } from "@/widgets/loading";
import { skipToken } from "@reduxjs/toolkit/query";
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";

export interface BookingProps {
  query: IBookingQuery & PaginationQuery;
}

export const Bookings = ({ query }: BookingProps) => {
  const { location, account } = useSelector(accountSelector);
  const { data, isLoading, isError, isSuccess, isFetching } = useGetBookingsQuery(
    location && account?.has_bookings ? { ...query, location_id: location.id } : skipToken,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  if (!location) return <AppLoading />;
  
  const content = !account?.has_bookings ? (
    <BookingEmpty />
  ) : isLoading ? (
    <TableLoading rows={6} />
  ) : isError ? (
    <RequestError />
  ) : isSuccess ? (
    <BookingTable
      bookings={data.data}
      isFetching={isFetching}
      profileId={account?.id}
      meta={data.meta}
      query={query}
    />
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
                className={"text-sm font-bold"}
                iconLeft={<AddIcon width={21} height={21}/>}
              >Новая запись</Button>
            </Link>
          </Can>
        </PageHeaderActions>
      </PageHeader>

      {content}
    </>
  )
}

import { accountSelector } from "@/entities/account";
import { type IBookingQuery } from "@/entities/booking"
import { Can } from "@/features/auth";
import { AddIcon } from "@/shared/icons";
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle, Pagination } from "@/shared/ui"
import { BookingCalendar, BookingEmpty } from "@/widgets/booking";
import { PageTableWrapper, RequestError } from "@/widgets/layout";
import { AppLoading, TableLoading } from "@/widgets/loading";
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";

export interface BookingProps {
  query: IBookingQuery & PaginationQuery;
}

export const BookingCalendarPage = ({ query }: BookingProps) => {
  const { location, account } = useSelector(accountSelector);
  console.log(query)
  const isLoading = false;
  const isError = false;
  const isSuccess = true;
  const data = {
    meta: {
      total_pages: 0,
      page: 1,
      limit: 1,
      total: 0,
      has_next: false,
      has_prev: false,
    }
  };

  if (!location) return <AppLoading />;
  
  const content = !account?.has_bookings ? (
    <BookingEmpty />
  ) : isLoading ? (
    <TableLoading rows={5} />
  ) : isError ? (
    <RequestError />
  ) : isSuccess ? (
    <PageTableWrapper>

      <BookingCalendar view={"week"} />

      {data.meta.total_pages > 1 && <Pagination {...data.meta} />}
    </PageTableWrapper>
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

      {content}
    </>
  )
}

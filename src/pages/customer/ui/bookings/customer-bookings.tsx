import type { IBookingQuery } from "@/entities/booking";
import { useBookingsCustomerQuery } from "@/entities/customers";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle, Pagination } from "@/shared/ui";
import { BookingEmpty } from "@/widgets/booking";
import { CustomerBookingSort, CustomerBookingTable } from "@/widgets/customer";
import { PageTableWrapper, RequestError } from "@/widgets/layout";
import { TableLoading } from "@/widgets/loading";
import { skipToken } from "@reduxjs/toolkit/query";

interface CustomerBookingsProps {
  customer_id: string;
  query: Omit<IBookingQuery, "customer"> & PaginationQuery;
  client?: string;
}

export const CustomerBookings = ({ customer_id, query, client }: CustomerBookingsProps) => {
  const { data, isLoading, isError, isSuccess, isFetching } = useBookingsCustomerQuery(
    customer_id ? { customer_id, ...query } : skipToken,
    { refetchOnMountOrArgChange: true, },
  );

  const content = isLoading ? (
    <TableLoading rows={5} />
  ) : isError ? (
    <RequestError />
  ) : isSuccess ? (
    <PageTableWrapper>
      <CustomerBookingSort {...query} />

      <CustomerBookingTable
        bookings={data.data}
        isFetching={isFetching}
      />

      {data.meta.total_pages > 1 && <Pagination {...data.meta} />}
    </PageTableWrapper>
  ) : (
    <BookingEmpty />
  )

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Записи клиента <span className="capitalize">{client && `- ${client}`}</span></PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />

        </PageHeaderActions>
      </PageHeader>

      {content}
    </>
  )
}

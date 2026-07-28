import type { IBookingQuery } from "@/entities/booking";
import { useBookingsCustomerQuery } from "@/entities/customers";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui";
import { CustomerBookingsTable } from "@/widgets/customer";

interface CustomerBookingsProps {
  customer_id: string;
  query: Omit<IBookingQuery, "customer"> & PaginationQuery;
  client?: string;
}

export const CustomerBookings = ({ customer_id, query, client }: CustomerBookingsProps) => {
  const { data, isLoading, isError, isFetching } = useBookingsCustomerQuery({ customer_id, ...query });

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Записи клиента <span className="capitalize">{client && `- ${client}`}</span></PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />

        </PageHeaderActions>
      </PageHeader>

      {isLoading && <>loading...</>}
      {isError && <>not found</>}
      {data && (
        <CustomerBookingsTable
          bookings={data.data}
          meta={data.meta}
          isFetching={isFetching}
          query={query}
        />
      )
      }
    </>
  )
}

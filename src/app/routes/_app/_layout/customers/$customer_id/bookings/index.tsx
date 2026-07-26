import type { IBookingQuery } from '@/entities/booking';
import { CustomerBookings } from '@/pages/customer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/customers/$customer_id/bookings/',
)({
  validateSearch: (search: Record<string, unknown>): PaginationQuery & Omit<IBookingQuery, "customer"> & { full_name: string } => {
    return {
      page: search.page as number,
      limit: search.limit as number,
      employee: search.employee as string,
      service: search.service as string,
      tag: search.tag as string,
      status: search.status as BookingStatusType,
      sort: search.sort as SortType,
      full_name: search.full_name as string,
    };
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { customer_id } = Route.useParams();
  const query = Route.useSearch();
  return <CustomerBookings customer_id={customer_id} query={query} client={query.full_name} />
}

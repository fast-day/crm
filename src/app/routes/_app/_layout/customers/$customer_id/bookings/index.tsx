import { CustomerBookings } from '@/pages/customer'
import { uuidSchema } from '@/shared/schemas/params-scheha';
import { querySearchSchema } from '@/shared/schemas/query.schema';
import { CustomerNotFound } from '@/widgets/customer';
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod';

const customerBookingSearchSchema = querySearchSchema.extend({
  employee: z.string().optional(),
  service: z.string().optional(),
  tag: z.string().optional(),
  status: z.enum(["new", "completed", "cancelled"]).optional().catch(undefined),
  sort: z.enum(["newest", "oldest", "price_asc", "price_desc"]).optional().catch("newest"),
  full_name: z.string().optional(),
});

export const Route = createFileRoute(
  '/_app/_layout/customers/$customer_id/bookings/',
)({
  params: {
    parse: (p) => ({
      customer_id: uuidSchema.parse(p.customer_id),
    }),
    stringify: (p) => ({
      customer_id: p.customer_id,
    }),
  },
  validateSearch: customerBookingSearchSchema,
  errorComponent: () => <CustomerNotFound />,
  component: RouteComponent,
})

function RouteComponent() {
  const { customer_id } = Route.useParams();
  const query = Route.useSearch();
  return <CustomerBookings customer_id={customer_id} query={query} client={query.full_name} />
}

import { Bookings } from '@/pages/booking'
import { querySearchSchema } from '@/shared/schemas/query.schema';
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

const bookingSearchSchema = querySearchSchema.extend({
  customer: z.string().optional(),
  tag: z.string().optional(),
  status: z.enum(["new", "completed", "cancelled"]).optional().catch(undefined),
  sort: z.enum(["newest", "oldest", "price_asc", "price_desc"]).optional().catch("newest"),
});

export const Route = createFileRoute('/_app/_layout/bookings/')({
  validateSearch: bookingSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  return <Bookings query={query} />
}

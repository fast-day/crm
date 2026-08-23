import { BookingCreate } from '@/pages/booking'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

const bookingSearchCreateSchema = z.object({
  date: z.string().optional().catch(undefined),
});

export const Route = createFileRoute('/_app/_layout-focus/bookings/create/')({
  validateSearch: bookingSearchCreateSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  return <BookingCreate query={query} />
}

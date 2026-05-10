import { BookingCreate } from '@/pages/booking'
import { createFileRoute } from '@tanstack/react-router'
// import z from 'zod'

// const bookingSearchSchema = z.object({
//   date: z.string().nullable(),
// });

export const Route = createFileRoute('/_app/_layout/bookings/create/')({
  component: RouteComponent,
  // validateSearch: bookingSearchSchema,
})

function RouteComponent() {
  return <BookingCreate />
}

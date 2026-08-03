import { BookingDetail } from '@/pages/booking'
import { uuidSchema } from '@/shared/schemas/params-scheha';
import { BookingNotFound } from '@/widgets/booking';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout-focus/bookings/$booking_id/')({
  params: {
    parse: (p) => ({
      booking_id: uuidSchema.parse(p.booking_id),
    }),
    stringify: (p) => ({
      booking_id: p.booking_id,
    }),
  },
  errorComponent: () => <BookingNotFound />,
  component: RouteComponent,
})

function RouteComponent() {
  const { booking_id } = Route.useParams();
  return <BookingDetail booking_id={booking_id} />
}

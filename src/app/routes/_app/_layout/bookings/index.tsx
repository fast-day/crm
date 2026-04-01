import { Bookings } from '@/pages/booking'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/bookings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Bookings />
}

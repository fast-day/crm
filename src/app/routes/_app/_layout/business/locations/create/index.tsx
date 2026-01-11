import { LocationCreate } from '@/pages/location'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/business/locations/create/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <LocationCreate />
}

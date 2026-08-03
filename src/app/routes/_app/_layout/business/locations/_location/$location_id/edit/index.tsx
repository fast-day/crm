import { LocationEdit } from '@/pages/location'
import { uuidSchema } from '@/shared/schemas/params-scheha'
import { LocationNotFound } from '@/widgets/location'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/business/locations/_location/$location_id/edit/',
)({
  params: {
    parse: (p) => ({
      location_id: uuidSchema.parse(p.location_id),
    }),
    stringify: (p) => ({
      location_id: p.location_id,
    }),
  },
  errorComponent: () => <LocationNotFound />,
  component: RouteComponent,
})

function RouteComponent() {
  return <LocationEdit />
}

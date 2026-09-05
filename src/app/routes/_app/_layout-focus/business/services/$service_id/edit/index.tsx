import { ServiceEdit } from '@/pages/services'
import { uuidSchema } from '@/shared/schemas/params-schema'
import { ServiceNotFound } from '@/widgets/services'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout-focus/business/services/$service_id/edit/',
)({
  params: {
    parse: (p) => ({
      service_id: uuidSchema.parse(p.service_id),
    }),
    stringify: (p) => ({
      service_id: p.service_id,
    }),
  },
  errorComponent: () => <ServiceNotFound />,
  component: RouteComponent,
})

function RouteComponent() {
  const { service_id } = Route.useParams();
  return <ServiceEdit service_id={service_id} />
}

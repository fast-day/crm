import { ServiceEmployees } from '@/pages/services'
import { uuidSchema } from '@/shared/schemas/params-scheha'
import { ServiceNotFound } from '@/widgets/services'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/business/services/$service_id/employees/',
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
  return <ServiceEmployees />
}

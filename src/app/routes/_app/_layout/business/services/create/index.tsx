import { ServiceCreate } from '@/pages/services/ui/service-create'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/business/services/create/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <ServiceCreate />
}

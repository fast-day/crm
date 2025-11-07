import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/company/create/service/$service_id',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/_layout/company/create/service/$service_id"!</div>
}

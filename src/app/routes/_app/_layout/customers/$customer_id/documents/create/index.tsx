import { CustomerDocumentCreate } from '@/pages/customer';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/customers/$customer_id/documents/create/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { customer_id } = Route.useParams();
  return <CustomerDocumentCreate customer_id={customer_id} />
}

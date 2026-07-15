import { CustomerDocument } from '@/pages/customer';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/customers/$customer_id/documents/$document_id/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { document_id } = Route.useParams();
  return <CustomerDocument document_id={document_id} />
}

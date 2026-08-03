import { CustomerDocument } from '@/pages/customer';
import { uuidSchema } from '@/shared/schemas/params-scheha';
import { CustomerDocumentNotFound } from '@/widgets/customer';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/customers/$customer_id/documents/$document_id/',
)({
  params: {
    parse: (p) => ({
      customer_id: uuidSchema.parse(p.customer_id),
      document_id: uuidSchema.parse(p.document_id),
    }),
    stringify: (p) => ({
      customer_id: p.customer_id,
      document_id: p.document_id,
    }),
  },
  errorComponent: () => <CustomerDocumentNotFound />,
  component: RouteComponent,
})

function RouteComponent() {
  const { customer_id, document_id } = Route.useParams();
  return <CustomerDocument customer_id={customer_id} document_id={document_id} />
}

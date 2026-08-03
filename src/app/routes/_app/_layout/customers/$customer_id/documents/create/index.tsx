import { CustomerDocumentCreate } from '@/pages/customer';
import { uuidSchema } from '@/shared/schemas/params-scheha';
import { CustomerNotFound } from '@/widgets/customer';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/customers/$customer_id/documents/create/',
)({
  params: {
    parse: (p) => ({
      customer_id: uuidSchema.parse(p.customer_id),
    }),
    stringify: (p) => ({
      customer_id: p.customer_id,
    }),
  },
  errorComponent: () => <CustomerNotFound />,
  component: RouteComponent,
})

function RouteComponent() {
  const { customer_id } = Route.useParams();
  return <CustomerDocumentCreate customer_id={customer_id} />
}

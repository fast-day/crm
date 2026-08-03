import { CustomerDocuments } from '@/pages/customer'
import { uuidSchema } from '@/shared/schemas/params-scheha';
import { querySearchSchema } from '@/shared/schemas/query.schema';
import { CustomerNotFound } from '@/widgets/customer';
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod';

const customerDocumentSearchSchema = querySearchSchema.extend({
  full_name: z.string().optional(),
});

export const Route = createFileRoute(
  '/_app/_layout/customers/$customer_id/documents/',
)({
  params: {
    parse: (p) => ({
      customer_id: uuidSchema.parse(p.customer_id),
    }),
    stringify: (p) => ({
      customer_id: p.customer_id,
    }),
  },
  validateSearch: customerDocumentSearchSchema,
  errorComponent: () => <CustomerNotFound />,
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  const { customer_id } = Route.useParams();
  return <CustomerDocuments query={query} customer_id={customer_id} />
}

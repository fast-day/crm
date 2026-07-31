import { CustomerDocuments } from '@/pages/customer'
import { querySearchSchema } from '@/shared/schemas/query.schema';
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod';

const customerDocumentSearchSchema = querySearchSchema.extend({
  full_name: z.string().optional(),
});

export const Route = createFileRoute(
  '/_app/_layout/customers/$customer_id/documents/',
)({
  validateSearch: customerDocumentSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  const { customer_id } = Route.useParams();
  return <CustomerDocuments query={query} customer_id={customer_id} />
}

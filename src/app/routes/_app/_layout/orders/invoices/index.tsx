import { Invoices } from '@/pages/invoices'
import { querySearchSchema } from '@/shared/schemas/query.schema';
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod';

const invoiceSearchSchema = querySearchSchema.extend({
  status: z.enum(["success", "failed"]).optional().catch(undefined),
});

export const Route = createFileRoute('/_app/_layout/orders/invoices/')({
  validateSearch: invoiceSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  return <Invoices query={query} />
}

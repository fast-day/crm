import { Orders } from '@/pages/orders'
import { querySearchSchema } from '@/shared/schemas/query.schema';
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod';

const orderSearchSchema = querySearchSchema.extend({
  status: z.enum(["paid", "unpaid", "cancelled", "refund"]).optional().catch(undefined),
  sort: z.enum(["newest", "oldest", "price_asc", "price_desc"]).optional().catch("newest"),
});

export const Route = createFileRoute('/_app/_layout/orders/')({
  validateSearch: orderSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  return <Orders query={query} />
}

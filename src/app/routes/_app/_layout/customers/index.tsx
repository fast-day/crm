import { Customers } from '@/pages/customer'
import { querySearchSchema } from '@/shared/schemas/query.schema'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod';

const customerSearchSchema = querySearchSchema.extend({
  search: z.string().optional(),
  sort: z.enum(["newest", "oldest"]).optional().catch("newest"),
});

export const Route = createFileRoute('/_app/_layout/customers/')({
  validateSearch: customerSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  return <Customers query={query} />
}

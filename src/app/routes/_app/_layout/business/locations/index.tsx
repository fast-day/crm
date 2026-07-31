import { Locations } from '@/pages/location'
import { querySearchSchema } from '@/shared/schemas/query.schema';
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

const locationSearchSchema = querySearchSchema.extend({
  name: z.string().optional(),
  search: z.string().optional(),
  category: z.string().optional(),
  active: z.coerce.number().optional(),
});

export const Route = createFileRoute('/_app/_layout/business/locations/')({
  validateSearch: locationSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  return <Locations query={query} />
}

import { ServiceCreate } from '@/pages/services/ui/service-create'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

const serviceCreateSchema = z.object({
  redirect: z.string().optional().catch(undefined),
});

export const Route = createFileRoute('/_app/_layout-focus/business/services/create/')(
  {
    validateSearch: serviceCreateSchema,
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <ServiceCreate />
}

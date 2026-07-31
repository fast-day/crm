import { Employees } from '@/pages/employee'
import { querySearchSchema } from '@/shared/schemas/query.schema'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod';

const employeeSearchSchema = querySearchSchema.extend({
  search: z.string().optional(),
  role: z.enum(["owner", "employee", "admin"]).optional().catch(undefined),
  status: z.enum(["active", "disable", "invited"]).optional().catch(undefined),
});

export const Route = createFileRoute('/_app/_layout/employees/users/')({
  validateSearch: employeeSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  return <Employees query={query} />
}

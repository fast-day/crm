import { EmployeePassword } from '@/pages/employee'
import { uuidSchema } from '@/shared/schemas/params-schema'
import { EmployeeNotFound } from '@/widgets/employee'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout-focus/employees/users/$employee_id/password/',
)({
  params: {
    parse: (p) => ({
      employee_id: uuidSchema.parse(p.employee_id),
    }),
    stringify: (p) => ({
      employee_id: p.employee_id,
    }),
  },
  errorComponent: () => <EmployeeNotFound />,
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams();
  return <EmployeePassword {...params} />
}

import { EmployeePassword } from '@/pages/employee'
import { uuidSchema } from '@/shared/schemas/params-scheha'
import { EmployeeNotFound } from '@/widgets/employee'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/employees/users/$employee_id/password/',
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
  return <EmployeePassword />
}

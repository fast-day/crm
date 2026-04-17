import { EmployeeSchedule } from '@/pages/employee'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/employees/schedule/$employee_id',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <EmployeeSchedule />
}

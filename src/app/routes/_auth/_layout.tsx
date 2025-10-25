import { AuthLayout } from '@/widgets/layout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthLayout>3<Outlet /></AuthLayout>
}

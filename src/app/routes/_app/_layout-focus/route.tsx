import { AppFocusLayout } from '@/widgets/layout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout-focus')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppFocusLayout>
      <Outlet />
    </AppFocusLayout>
  )
}

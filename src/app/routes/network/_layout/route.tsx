import { OnlineHandler } from '@/app/providers/online'
import { NetworkLayout } from '@/widgets/layout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/network/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <NetworkLayout>
      <Outlet />
      <OnlineHandler />
    </NetworkLayout>
  )
}

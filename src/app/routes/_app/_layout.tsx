import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/_layout"! <Outlet /></div>
}

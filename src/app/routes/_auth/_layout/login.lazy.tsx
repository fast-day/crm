import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/_layout/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/login"!</div>
}

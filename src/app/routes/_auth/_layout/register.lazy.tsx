import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/_layout/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/register"!</div>
}

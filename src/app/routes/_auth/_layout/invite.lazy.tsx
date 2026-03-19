import { Invite } from '@/pages/auth'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/_layout/invite')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Invite />
}

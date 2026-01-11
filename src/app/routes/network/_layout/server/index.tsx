import { NetworkServer } from '@/pages/network'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/network/_layout/server/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NetworkServer />
}

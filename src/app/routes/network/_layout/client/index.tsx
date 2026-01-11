import { NetworkClient } from '@/pages/network'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/network/_layout/client/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NetworkClient />
}

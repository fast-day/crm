import { OnlineOverview } from '@/pages/online'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/online/overview/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <OnlineOverview />
}

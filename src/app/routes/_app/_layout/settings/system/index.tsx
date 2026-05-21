import { SystemSettings } from '@/pages/settings'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/settings/system/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SystemSettings />
}

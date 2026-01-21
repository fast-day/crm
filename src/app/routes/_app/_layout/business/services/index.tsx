import { Services } from '@/pages/services'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/business/services/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Services />
}

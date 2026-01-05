import { NotFound } from '@/widgets/layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/$notFound')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NotFound />
}

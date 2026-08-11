import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/orders/invoices/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/_layout/orders/invoices/"!</div>
}

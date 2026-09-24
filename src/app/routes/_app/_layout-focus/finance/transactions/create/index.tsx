import { TransactionCreate } from '@/pages/transactions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout-focus/finance/transactions/create/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <TransactionCreate />
}

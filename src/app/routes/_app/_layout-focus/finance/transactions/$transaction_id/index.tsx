import { TransactionDetail } from '@/pages/transactions';
import { uuidSchema } from '@/shared/schemas/params-schema'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout-focus/finance/transactions/$transaction_id/',
)({
  params: {
    parse: (p) => ({
      transaction_id: uuidSchema.parse(p.transaction_id),
    }),
    stringify: (p) => ({
      transaction_id: p.transaction_id,
    }),
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { transaction_id } = Route.useParams();
  return <TransactionDetail transaction_id={transaction_id} />
}

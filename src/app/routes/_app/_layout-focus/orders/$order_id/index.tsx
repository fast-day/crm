import { OrderDetail } from '@/pages/orders'
import { uuidSchema } from '@/shared/schemas/params-scheha';
import { OrderNotFound } from '@/widgets/orders';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout-focus/orders/$order_id/')({
  params: {
    parse: (p) => ({
      order_id: uuidSchema.parse(p.order_id),
    }),
    stringify: (p) => ({
      order_id: p.order_id,
    }),
  },
  errorComponent: () => <OrderNotFound />,
  component: RouteComponent,
})

function RouteComponent() {
  const { order_id } = Route.useParams();
  return <OrderDetail order_id={order_id} />
}

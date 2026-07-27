import { OrderCheckout } from '@/pages/orders';
import { createFileRoute } from '@tanstack/react-router'

type OrderCheckoutType = {
  booking_id: string;
  order_id?: string;
}

export const Route = createFileRoute('/_app/_layout/orders/checkout/sell/')({
  validateSearch: (search: Record<string, unknown>): OrderCheckoutType => {
    return {
      booking_id: search.booking_id as string,
      order_id: search.order_id as string,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  return <OrderCheckout  {...query} />
}

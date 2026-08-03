import { OrderCheckout } from '@/pages/orders';
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod';

const orderCheckoutSearchSchema = z.object({
  booking_id: z.string().optional(),
  order_id: z.string().optional(),
});

export const Route = createFileRoute('/_app/_layout-focus/orders/checkout/sell/')({
  validateSearch: orderCheckoutSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  return <OrderCheckout  {...query} />
}

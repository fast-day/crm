import { Transactions } from '@/pages/transactions';
import { querySearchSchema } from '@/shared/schemas/query.schema';
import { createFileRoute } from '@tanstack/react-router'
import { endOfMonth, format, startOfMonth } from "date-fns";
import z from 'zod';

const transactionSearchSchema = querySearchSchema.extend({
  start_date: z.string().optional().catch(undefined),
  end_date: z.string().optional().catch(undefined),
  category_id: z.number().optional().catch(undefined),
  type: z.enum(["earning", "refund_deduction", "expense"]).optional().catch(undefined),
});

export const Route = createFileRoute('/_app/_layout/orders/transactions/')({
  validateSearch: transactionSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  
  const defaultStartDate = format(startOfMonth(new Date()), "yyyy-MM-dd");
  const defaultEndDate = format(endOfMonth(new Date()), "yyyy-MM-dd");

  const startDate = query.start_date ?? defaultStartDate;
  const endDate = query.end_date ?? defaultEndDate;

  return <Transactions query={{ start_date: startDate, end_date: endDate, ...query }} />
}
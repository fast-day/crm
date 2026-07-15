import type { ICustomerDocumentQuery } from '@/entities/customers';
import { CustomerDocuments } from '@/pages/customer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_layout/customers/$customer_id/documents/',
)({
  validateSearch: (search: Record<string, unknown>): PaginationQuery & ICustomerDocumentQuery => {
    return {
      full_name: search.full_name as string,
      page: search.page as number,
      limit: search.limit as number,
    };
  },
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  return <CustomerDocuments query={query} />
}

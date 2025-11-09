import { CompanySelectService } from '@/pages/company'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/company/create/service/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CompanySelectService />;
}

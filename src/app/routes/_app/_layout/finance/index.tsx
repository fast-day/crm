import { Finance } from '@/pages/finance'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

export const Route = createFileRoute('/_app/_layout/finance/')({
  component: RouteComponent,
})

function RouteComponent() {
  const isTablet = useMediaQuery({ query: `(max-width: 1099px)` });
  const navigate = Route.useNavigate();

  useEffect(() => {
    if (!isTablet) {
      navigate({ to: "/finance/orders" });
      return;
    }
  }, [isTablet]);

  return <Finance />
}

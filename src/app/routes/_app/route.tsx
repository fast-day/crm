import { PrivateRoute } from '@/features/auth';
import { InitializedApp } from '@/widgets/layout';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PrivateRoute>
      <InitializedApp />
    </PrivateRoute>
  )
}

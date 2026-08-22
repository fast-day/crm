import { OnlineHandler } from '@/app/providers/online';
import { PrivateRoute } from '@/features/auth';
import { NavigationHandler } from '@/features/navigation';
import { InitializedApp } from '@/widgets/layout';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PrivateRoute>
      <InitializedApp />
      <OnlineHandler />
      <NavigationHandler />
    </PrivateRoute>
  )
}

import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/network/_layout/')({
  beforeLoad: () => {
    throw redirect({ to: "/bookings" });
  }
})

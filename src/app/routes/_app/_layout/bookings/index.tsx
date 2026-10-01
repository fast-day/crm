import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/bookings/')({
  beforeLoad: () => {
    const lastPage = localStorage.getItem("booking_calendar_view");
    throw redirect({ to: lastPage === "list" ? "/bookings/list" : "/bookings/calendar" });
  },
})

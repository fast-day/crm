import type { TCalendarView } from '@/entities/calendar';
import { getCalendarDateRange } from '@/entities/calendar/model/utils/event-calendar.util';
import { BookingCalendarPage } from '@/pages/booking';
import { querySearchSchema } from '@/shared/schemas/query.schema';
import { createFileRoute, redirect } from '@tanstack/react-router'
import z from 'zod';

const bookingSearchSchema = querySearchSchema.extend({
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

export const Route = createFileRoute('/_app/_layout/bookings/calendar/')({
  validateSearch: bookingSearchSchema,
  beforeLoad: ({ search }) => {
    if (search.start_date && search.end_date) return;
    const view = (localStorage.getItem("booking_calendar_view") as TCalendarView) ?? "week";
    const range = getCalendarDateRange(new Date(), view);

    throw redirect({ to: "/bookings/calendar", search: { ...search, ...range } });
  },
  component: RouteComponent,
})

function RouteComponent() {
  const query = Route.useSearch();
  return <BookingCalendarPage query={query} />
}

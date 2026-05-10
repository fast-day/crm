import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { BookingCreateForm } from "@/widgets/booking"
import { useSearch } from "@tanstack/react-router"

export const BookingCreate = () => {

  const search = useSearch({ from: "/_app/_layout/bookings/create/" });

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Новое бронирование</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      <BookingCreateForm date={search.date} />
    </>
  )
}

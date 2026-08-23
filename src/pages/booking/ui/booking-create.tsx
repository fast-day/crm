import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { BookingCreateForm } from "@/widgets/booking"

interface IBookingCreateProps {
  query: {
    date: string;
  }
}

export const BookingCreate = ({ query }: IBookingCreateProps) => {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Новая запись</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      <BookingCreateForm date={query.date} />
    </>
  )
}

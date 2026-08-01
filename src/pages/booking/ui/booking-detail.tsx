import { useGetBookingQuery } from "@/entities/booking";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { BookingDetails, BookingDetailsLoading, BookingNotFound } from "@/widgets/booking";
import { RequestError } from "@/widgets/layout";
import { useParams } from "@tanstack/react-router"

export const BookingDetail = () => {
  const { booking_id } = useParams({ from: "/_app/_layout/bookings/$booking_id/" });
  
  const { data, isLoading, isFetching, isError } = useGetBookingQuery(
    { booking_id },
    { refetchOnMountOrArgChange: true },
  );

  const content = isLoading || isFetching ? (
    <BookingDetailsLoading/>
  ) : isError ? (
    <RequestError />
  ) : data ? (
    <BookingDetails booking={data} />
  ) : (
    <BookingNotFound />
  )

  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle>Запись № {data?.tag}</PageHeaderTitle>
        </div>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {content}
    </>
  )
}

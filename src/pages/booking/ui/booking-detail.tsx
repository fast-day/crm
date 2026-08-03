import { useGetBookingQuery } from "@/entities/booking";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { BookingDetails, BookingDetailsLoading, BookingNotFound } from "@/widgets/booking";
import { RequestError } from "@/widgets/layout";

interface IBookingDetailProps {
  booking_id: string;
}

export const BookingDetail = ({ booking_id }: IBookingDetailProps) => {
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

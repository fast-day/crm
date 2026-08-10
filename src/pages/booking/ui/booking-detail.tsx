import { useGetBookingQuery } from "@/entities/booking";
import { CloseIcon } from "@/shared/icons";
import { Button, PageHeader, PageHeaderActions, PageHeaderTitle } from "@/shared/ui"
import { BookingDetails, BookingDetailsLoading, BookingNotFound } from "@/widgets/booking";
import { RequestError } from "@/widgets/layout";
import { Link } from "@tanstack/react-router";

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
          <Link to={"/bookings"} className="block">
            <Button variant={"white"} size={"icon_44"} animation={"toggle"}>
              <CloseIcon width={18} height={18} />
            </Button>
          </Link>
        </PageHeaderActions>
      </PageHeader>

      {content}
    </>
  )
}

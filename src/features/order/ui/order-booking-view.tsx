import { ChevronIcon } from "@/shared/icons"
import { Button } from "@/shared/ui"
import { Link } from "@tanstack/react-router"

interface IOrderBookingViewProps {
  booking_id: string;
}

export const OrderBookingView = ({ booking_id }: IOrderBookingViewProps) => {
  return (
    <Link to={`/bookings/${booking_id}`} className="block">
      <Button
        type={"button"}
        size={"size_60"}
        variant={"white"}
        className={"p-5"}
        isLoading={false}
        disabled={false}
        iconRight={<ChevronIcon width={20} height={20} />}
      >Посмотреть запись</Button>
    </Link>
  )
}

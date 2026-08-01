import { useGetOrderQuery } from "@/entities/orders";
import { CloseIcon } from "@/shared/icons";
import { Button, PageHeader, PageHeaderActions } from "@/shared/ui";
import { OrderDetails, OrderNotFound } from "@/widgets/orders";
import { Link } from "@tanstack/react-router";

interface OrderDetailProps {
  order_id: string;
}

export const OrderDetail = ({ order_id }: OrderDetailProps) => {

  const { data, isLoading, isError, isFetching } = useGetOrderQuery(
    { order_id },
    { refetchOnMountOrArgChange: true },
  );

  return (
    <>
    
      <PageHeader>
        <PageHeaderActions>
          <Link to={"/orders"} className="block">
            <Button variant={"white"} size={"icon_44"} animation={"toggle"}>
              <CloseIcon width={18} height={18} />
            </Button>
          </Link>
        </PageHeaderActions>
      </PageHeader>

      {isError && <OrderNotFound />}
      {data && <OrderDetails order={data} isFetching={isLoading || isFetching} />}
    </>
  )
}

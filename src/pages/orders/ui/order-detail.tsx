import { useGetOrderQuery } from "@/entities/orders";
import { PageHeader, PageHeaderActions, PageHeaderBackAction } from "@/shared/ui";
import { OrderDetails, OrderNotFound } from "@/widgets/orders";

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
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {isError && <OrderNotFound />}
      {data && <OrderDetails order={data} isFetching={isLoading || isFetching} />}
    </>
  )
}

import { useGetOrderQuery } from "@/entities/orders";
import { CloseIcon } from "@/shared/icons";
import { Button, PageHeader, PageHeaderActions } from "@/shared/ui";
import { ContentLayout } from "@/widgets/layout";
import { OrderDetails, OrderNotFound } from "@/widgets/orders";
import { OrderDetailsPanelLoading } from "@/widgets/orders/ui/result/order-details-panel-loading";
import { OrderResultLoading } from "@/widgets/orders/ui/result/order-result-loading";
import { Link } from "@tanstack/react-router";

interface OrderDetailProps {
  order_id: string;
}

export const OrderDetail = ({ order_id }: OrderDetailProps) => {
  const { data, isLoading, isError, isSuccess, isFetching } = useGetOrderQuery(
    { order_id },
    { refetchOnMountOrArgChange: true },
  );

  const content = (isLoading || isFetching) ? (
    <>
      <ContentLayout>
        <OrderResultLoading />
      </ContentLayout>

      <OrderDetailsPanelLoading />
    </>
  ) : isError ? (
    <OrderNotFound />
  ) : isSuccess ? (
    <OrderDetails order={data} />
  ) : <OrderNotFound />

  return (
    <>
    
      <PageHeader>
        <PageHeaderActions>
          <Link to={"/finance/orders"} className="block">
            <Button variant={"white"} size={"icon_44"} animation={"toggle"}>
              <CloseIcon width={18} height={18} />
            </Button>
          </Link>
        </PageHeaderActions>
      </PageHeader>

      <div className="h-full">
        <div className="flex h-full 1100:flex-row flex-col-reverse gap-8">
          {content}
        </div>
      </div>
    </>
  )
}

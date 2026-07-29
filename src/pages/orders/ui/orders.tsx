import { accountSelector } from "@/entities/account";
import { useGetOrdersQuery, type IOrderQuery } from "@/entities/orders";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { TableLoading } from "@/widgets/loading";
import { OrderEmpty, OrderTable } from "@/widgets/orders";
import { useSelector } from "react-redux";

export interface OrderProps {
  query: IOrderQuery;
}

export const Orders = ({ query }: OrderProps) => {
  const { account } = useSelector(accountSelector);
  const { data, isLoading, isError, isSuccess, isFetching } = useGetOrdersQuery(
    { ...query },
    { refetchOnMountOrArgChange: true },
  );
  
  const content = isLoading ? (
    <TableLoading rows={6} />
  ) : isError ? (
    <>error message</>
  ) : isSuccess && account?.has_orders ? (
    <OrderTable orders={data.data} isFetching={isFetching} meta={data.meta} query={query} />
  ) : (
    <OrderEmpty />
  );

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Платежи</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {content}
    </>
  )
}

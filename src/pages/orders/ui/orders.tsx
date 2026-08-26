import { accountSelector } from "@/entities/account";
import { useGetOrdersQuery, type IOrderQuery } from "@/entities/orders";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle, Pagination } from "@/shared/ui"
import { PageTableWrapper, RequestError } from "@/widgets/layout";
import { TableLoading } from "@/widgets/loading";
import { OrderEmpty, OrderSort, OrderTable } from "@/widgets/orders";
import { skipToken } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";

export interface OrderProps {
  query: IOrderQuery;
}

export const Orders = ({ query }: OrderProps) => {
  const { account } = useSelector(accountSelector);
  const { data, isLoading, isError, isSuccess, isFetching } = useGetOrdersQuery(
    account?.has_orders ? { ...query } : skipToken,
    { refetchOnMountOrArgChange: true },
  );
  
  const content = !account?.has_orders ? (
    <OrderEmpty />
  ) : isLoading ? (
    <TableLoading rows={6} />
  ) : isError ? (
    <RequestError />
  ) : isSuccess ? (
    <PageTableWrapper>
      <OrderSort {...query} />

      <OrderTable
        orders={data.data}
        isFetching={isFetching}
      />

      {data.meta.total_pages > 1 && <Pagination {...data.meta} />}
    </PageTableWrapper>
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

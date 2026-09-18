import { useGetTransactionsQuery, type ITransactionQuery } from "@/entities/transactions";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle, Pagination } from "@/shared/ui";
import { PageTableWrapper, RequestError } from "@/widgets/layout";
import { TableLoading } from "@/widgets/loading";
import { TransactionDigit, TransactionsEmpty, TransactionSort, TransactionTable } from "@/widgets/transactions";

interface ITransactionsProps {
  query: ITransactionQuery;
}

export const Transactions = ({ query }: ITransactionsProps) => {
  const { data, isLoading, isError, isSuccess, isFetching } = useGetTransactionsQuery(
    { start_date: query.start_date, end_date: query.end_date, ...query },
    { refetchOnMountOrArgChange: true },
  );

  const content = isLoading ? (
    <TableLoading rows={6} />
  ) : isError ? (
    <RequestError />
  ) : isSuccess ? (
    <PageTableWrapper>

      <TransactionDigit total_amount={data.data[0].total_amount ?? 0} />

      <TransactionSort {...query} />

      <TransactionTable
        transactions={data.data[0].transactions}
        isFetching={isFetching}
      />

      {data.meta.total_pages > 1 && <Pagination {...data.meta} />}
    </PageTableWrapper>
  ) : (
    <TransactionsEmpty />
  );

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Транзакции</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {content}
    </>
  )
}

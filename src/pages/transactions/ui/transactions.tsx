import { useGetTransactionsQuery, type ITransactionQuery } from "@/entities/transactions";
import { Can } from "@/features/auth";
import { AddIcon } from "@/shared/icons";
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle, Pagination } from "@/shared/ui";
import { PageTableWrapper, RequestError } from "@/widgets/layout";
import { TableLoading } from "@/widgets/loading";
import { TransactionDigit, TransactionsEmpty, TransactionSort, TransactionTable } from "@/widgets/transactions";
import { Link } from "@tanstack/react-router";

interface ITransactionsProps {
  query: ITransactionQuery;
}

export const Transactions = ({ query }: ITransactionsProps) => {
  const { data, isLoading, isError, isSuccess, isFetching } = useGetTransactionsQuery(
    {
      start_date: query.start_date,
      end_date: query.end_date,
      type: query.type,
      category_id: query.category_id,
      page: query.page,
      limit: query.limit,
    },
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
          <Can permission={"transactions:create"}>
            <Link to={"create"}>
              <Button 
                size={"size_44"}
                animation={"toggle"}
                className={"text-sm font-bold 1100:w-fit w-11 1100:px-6 px-0"}
                classNameChild={"1100:block hidden"}
                iconLeft={<AddIcon width={21} height={21}/>}
              >Добавить транзакцию</Button>
            </Link>
          </Can>
        </PageHeaderActions>
      </PageHeader>

      {content}
    </>
  )
}

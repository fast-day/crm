import { useGetInvoicesQuery, type IInvoiceQuery } from "@/entities/invoice";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle, Pagination } from "@/shared/ui";
import { InvoiceTable } from "@/widgets/invoices";
import { PageTableWrapper, RequestError } from "@/widgets/layout";
import { TableLoading } from "@/widgets/loading";

interface IInvoicesProps {
  query: IInvoiceQuery;
}

export const Invoices = ({ query }: IInvoicesProps) => {
  const { data, isLoading, isSuccess, isError, isFetching } = useGetInvoicesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true },
  );

  const content = isLoading ? (
    <TableLoading rows={6} />
  ) : isError ? (
    <RequestError />
  ) : isSuccess ? (
    <PageTableWrapper>
      <InvoiceTable invoices={data.data} isFetching={isFetching} />
      {data.meta.total_pages > 1 && <Pagination {...data.meta} />}
    </PageTableWrapper>
  ) : (
    <>empty</>
  );

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Чеки</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {content}
    </>
  )
}

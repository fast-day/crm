import { useGetCustomerDocumentsQuery, type ICustomerDocumentQuery } from "@/entities/customers";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { CustomerDocumentsLoading, CustomerDocumentsNotFound, CustomerDocumentsTable } from "@/widgets/customer";
import { RequestError } from "@/widgets/layout";
import { skipToken } from "@reduxjs/toolkit/query";

interface ICustomerDocumentsProps {
  query: PaginationQuery & ICustomerDocumentQuery;
  customer_id: string;
}

export const CustomerDocuments = ({ query, customer_id }: ICustomerDocumentsProps) => {

  const { data, isLoading, isError, isSuccess } = useGetCustomerDocumentsQuery(
    customer_id ? {
    customer_id,
    query: {
      page: query.page,
      limit: query.limit,
    },
  } : skipToken,
  { refetchOnMountOrArgChange: true });

  const content = isLoading ? (
    <CustomerDocumentsLoading />
  ) : isError ? (
    <CustomerDocumentsNotFound />
  ) : isSuccess ? (
    <CustomerDocumentsTable documents={data.data} meta={data.meta} />
  ) : <RequestError />;

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Заметки клиента {query.full_name && `- ${query.full_name}`}</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />

        </PageHeaderActions>
      </PageHeader>
    
      {content}
    </>
  )
}

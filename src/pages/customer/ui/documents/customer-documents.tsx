import type { ICustomerDocumentQuery } from "@/entities/customers";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { CustomerDocumentsTable } from "@/widgets/customer";

interface ICustomerDocumentsProps {
  query: PaginationQuery & ICustomerDocumentQuery;
}

export const CustomerDocuments = ({ query }: ICustomerDocumentsProps) => {
  return (
    <>
    
      <PageHeader>
        <PageHeaderTitle>Заметки клиента {query.full_name && `- ${query.full_name}`}</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />

        </PageHeaderActions>
      </PageHeader>
    
      <CustomerDocumentsTable />
    </>
  )
}

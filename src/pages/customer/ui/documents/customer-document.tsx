import { useGetCustomerDocumentQuery } from "@/entities/customers";
import { Editor } from "@/widgets/customer";

interface ICustomerDocumentProps {
  customer_id: string;
  document_id: string;
}

export const CustomerDocument = ({ customer_id, document_id }: ICustomerDocumentProps) => {
  const { data, isLoading, isError } = useGetCustomerDocumentQuery({ customer_id, document_id });

  return (
    <>
      {isLoading && <div>loading...</div>}
      {isError && <div>error</div>}

      {data && (
        <Editor
          data={data.content ?? undefined}
          name={data.name}
          customer_id={customer_id}
          document_id={document_id}
        />
      )}
    </>
  )
}

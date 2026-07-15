import { Editor } from "@/widgets/customer";

interface ICustomerDocumentProps {
  document_id: string;
}

export const CustomerDocument = ({ document_id }: ICustomerDocumentProps) => {
  return (
    <>
      {document_id}
      <Editor data={undefined} />
    </>
  )
}

import { Editor } from "@/widgets/customer";

interface ICustomerDocumentProps {
  document_id: string;
}

export const CustomerDocument = ({ document_id }: ICustomerDocumentProps) => {
  return (
    <>
      <Editor data={undefined} />
    </>
  )
}

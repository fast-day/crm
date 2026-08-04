import { useGetCustomerDocumentQuery } from "@/entities/customers";
import { ArrowBackUpIcon } from "@/shared/icons";
import { Button } from "@/shared/ui";
import { CustomerDocumentLoading, CustomerDocumentNotFound, Editor, EditorHead } from "@/widgets/customer";
import { BlockNoteEditor } from "@blocknote/core";
import { ru } from "@blocknote/core/locales";
import { useMemo } from "react";

interface ICustomerDocumentProps {
  customer_id: string;
  document_id: string;
}

export const CustomerDocument = ({ customer_id, document_id }: ICustomerDocumentProps) => {
  const { data, isLoading, isError } = useGetCustomerDocumentQuery(
    { customer_id, document_id },
    { refetchOnMountOrArgChange: true },
  );

  const editor = useMemo(() => {
    if (!data) return undefined;
    return BlockNoteEditor.create({
      initialContent: data?.content ?? undefined,
      dictionary: ru,
    });
  }, [data]);

  if (isLoading || !editor) return <CustomerDocumentLoading />

  const content = isError || !editor ? (
    <CustomerDocumentLoading />
  ) : isError || !data ? (
    <CustomerDocumentNotFound />
  ) : (
    <div className="max-w-180 w-full mx-auto space-y-8 relative">

      <EditorHead document_id={data.id} customer={data.customer} />

      <Editor
        editor={editor}
        name={data.name}
        customer_id={customer_id}
        document_id={document_id}
      />
    </div>
  );

  return (
    <>
      <Button
        onClick={() => history.back()}
        variant={"transparent"}
        size={"icon_44"}
        className={"bg-white/50 hover:bg-white/90 sticky top-8 left-8"}
      ><ArrowBackUpIcon width={24} height={24} /></Button>

      {content}
    </>
  )
}

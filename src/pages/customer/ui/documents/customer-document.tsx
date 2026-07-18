import { useGetCustomerDocumentQuery } from "@/entities/customers";
import { LockIcon, SearchIcon, TrashIcon, UsersGroupIcon } from "@/shared/icons";
import { Button, Card, CardContent } from "@/shared/ui";
import { CustomerDocumentLoading, Editor, EditorHead } from "@/widgets/customer";

interface ICustomerDocumentProps {
  customer_id: string;
  document_id: string;
}

export const CustomerDocument = ({ customer_id, document_id }: ICustomerDocumentProps) => {
  const { data, isLoading, isError } = useGetCustomerDocumentQuery({ customer_id, document_id });

  return (
    <>
      {isLoading && <CustomerDocumentLoading />}
      {isError && <div>Не удалось загрузить документ</div>}

      {data && (
        <div className="max-w-180 w-full mx-auto space-y-8 relative">

          <EditorHead document_id={data.id} customer={data.customer} />

          <Editor
            data={data.content ?? undefined}
            name={data.name}
            customer_id={customer_id}
            document_id={document_id}
          />

          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10">
            <Card className="bg-white rounded-2xl">
              <CardContent className="p-1.5 flex items-center">
                <Button variant={"transparent"} size={"icon_36"} className="hover:bg-card rounded-10! [&_svg:not([class*='size-'])]:size-5.5">
                  <TrashIcon />
                </Button>
                <Button variant={"transparent"} size={"icon_36"} className="hover:bg-card rounded-10! [&_svg:not([class*='size-'])]:size-5.5">
                  <LockIcon />
                </Button>
                <Button variant={"transparent"} size={"icon_36"} className="hover:bg-card rounded-10! [&_svg:not([class*='size-'])]:size-5.5">
                  <UsersGroupIcon />
                </Button>
                <Button variant={"transparent"} size={"icon_36"} className="hover:bg-card rounded-10! [&_svg:not([class*='size-'])]:size-5.5">
                  <SearchIcon />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}

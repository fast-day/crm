import type { ICustomerDocumentProfileInfo } from "@/entities/customers";
import { Avatar } from "@/entities/user";
import { Button, Card, CardContent, CardTitle } from "@/shared/ui";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

interface IEditorHeadProps {
  document_id: string;
  customer: ICustomerDocumentProfileInfo;
}

export const EditorHead = ({ document_id, customer }: IEditorHeadProps) => {
  return (
    <div>
      <Card>
        <CardContent className="flex items-center justify-between p-5.5">
          <div className="flex items-center gap-2.5">
            <Avatar size={"size_74"} id={customer.id} avatar_url={customer.profile.avatar} name={customer.profile.full_name} />
            <div>
              <CardTitle>{customer.profile.full_name}</CardTitle>
              <Link className="text-xs opacity-50 hover:opacity-80 duration-200" to={`tel:${customer.profile.phone}`}>{customer.profile.phone}</Link>
            </div>
          </div>
          <div>
            <Button
              variant={"action"}
              size={"size_44"}
              className={"text-sm"}
              onClick={() => toast.success(document_id)}
            >Сохранить в docx</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

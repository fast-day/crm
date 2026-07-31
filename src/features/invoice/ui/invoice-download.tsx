import Download from "@/shared/icons/Download";
import { Button } from "@/shared/ui";

interface IInvoiceDownloadProps {
  invoice_id: string;
}

export const InvoiceDownload = ({ invoice_id }: IInvoiceDownloadProps) => {
  return (
    <Button
      type={"button"}
      variant={"white"}
      size={"icon_40"}
      onClick={() => console.log(invoice_id)}
      animation={"toggle_sm"}
      className="hover:opacity-100 opacity-75"
    ><Download width={20} height={20} /></Button>
  )
}

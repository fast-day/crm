import { useDownloadInvoiceMutation } from "@/entities/invoice";
import Download from "@/shared/icons/Download";
import { Button } from "@/shared/ui";
import { getErrorMessage } from "@/shared/utils";
import { toast } from "sonner";

interface IInvoiceDownloadProps {
  invoice_id: string;
  tag: string;
}

export const InvoiceDownload = ({ invoice_id, tag }: IInvoiceDownloadProps) => {
  const [download, { isLoading }] = useDownloadInvoiceMutation();

  const handleDownload = async () => {
    try {
      await download({ invoice_id, tag }).unwrap();
    }
    catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <Button
      type={"button"}
      variant={"white"}
      size={"icon_40"}
      onClick={handleDownload}
      disabled={isLoading}
      animation={"toggle_sm"}
      className={"hover:opacity-100 opacity-75"}
    ><Download width={20} height={20} /></Button>
  )
}

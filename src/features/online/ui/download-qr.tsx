import { useDownloadOnlineWidgetMutation } from "@/entities/account";
import { Button } from "@/shared/ui"
import { getErrorMessage } from "@/shared/utils";
import { DownloadIcon } from "lucide-react"
import { toast } from "sonner";

export const DownloadQr = () => {
  const [download, { isLoading }] = useDownloadOnlineWidgetMutation();

  const handleDownload = async () => {
    try {
      await download().unwrap();
    }
    catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <Button
      size={"size_48"}
      variant={"white"}
      animation={"toggle_sm"}
      onClick={handleDownload}
      className={"480:min-w-12 w-fit 480:p-0 px-4"}
      classNameChild={"480:hidden block font-semibold text-sm"}
      iconLeft={<DownloadIcon width={20} height={20} />}
      disabled={isLoading || isLoading}
    >Скачать QR-код</Button>
  )
}

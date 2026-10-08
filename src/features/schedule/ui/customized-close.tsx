import { CloseIcon } from "@/shared/icons"
import { Button } from "@/shared/ui"

interface ICustomizedCloseProps {
  onClick?: () => void;
}

export const CustomizedClose = ({ onClick }: ICustomizedCloseProps) => {
  return (
    <Button
      type={"button"}
      variant={"transparent"}
      size={"icon_56"}
      className={"hover:bg-red/25 hover:text-red rounded-none"}
      onClick={onClick}
    ><CloseIcon width={20} height={20} /></Button>
  )
}

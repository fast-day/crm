import { Button } from "@/shared/ui"
import { ChevronRightIcon } from "lucide-react"

interface CurrentDateProps {
  goPrevMonth: () => void;
  goNextMonth: () => void;
}

export const CurrentDate = ({ goPrevMonth, goNextMonth }: CurrentDateProps) => {
  return (
    <div className="flex items-center gap-1">
      <Button variant={"white"} size={"icon_40"} onClick={goPrevMonth} aria-label={"Предыдущий месяц"}>
        <ChevronRightIcon className="rotate-180" width={20} height={20} />
      </Button>

      <Button variant={"white"} size={"icon_40"} onClick={goNextMonth} aria-label={"Следующий месяц"}>
        <ChevronRightIcon width={20} height={20} />
      </Button>
    </div>
  )
}

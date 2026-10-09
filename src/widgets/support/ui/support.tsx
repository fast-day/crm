import { Button, Dropdown, DropdownContent, DropdownTrigger } from "@/shared/ui"
import { SupportWidget } from "./support-widget"
import { PhoneIcon } from "@/shared/icons"
import { X } from "lucide-react"

export const Support = () => {
  return (
    <Dropdown className="fixed 1100:bottom-8 1100:right-8 bottom-20 right-5 z-10">
      <DropdownTrigger>
        <Button
          type={"button"}
          size={"icon_48"}
          animation={"toggle_sm"}
          className={"rounded-full hover:bg-primary hover:opacity-100 active:bg-primary active:opacity-100"}
        ><PhoneIcon width={24} height={24} /></Button>
      </DropdownTrigger>
      <DropdownContent align="end" side="top" className="p-5" cancelLabel="Хорошо">
        {({ close }) => (
          <>
            <SupportWidget className="p-0 border-transparent" />
            <Button
              type={"button"}
              variant={"transparent"}
              size={"icon_28"}
              onClick={close}
              className={"md:flex hidden absolute top-1.5 right-1.5 opacity-60 hover:opacity-100"}
            ><X width={18} height={18} /></Button>
          </>
        )}
      </DropdownContent>
    </Dropdown>
  )
}

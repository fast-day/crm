import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui"

export const CustomerCreateSheet = () => {
  return (
    <Sheet>
      <SheetTrigger
        variant={"transparent"}
        size={"size_24"}
        className={"w-fit! text-primary"}
      >Добавить</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Добавление клиента</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

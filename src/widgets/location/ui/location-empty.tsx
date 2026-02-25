import { AddFillIcon, ShopIcon } from "@/shared/icons"
import { Button, Empty } from "@/shared/ui"
import { EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui/empty/ui/empty"
import { Link } from "@tanstack/react-router"

export const LocationEmpty = () => {
  return (
    <Empty className="flex-1 h-full">
      <EmptyHeader>
        <EmptyMedia variant={"empty"}>
          <ShopIcon />
        </EmptyMedia>
        <EmptyTitle>У вас еще нет локаций</EmptyTitle>
        <EmptyDescription>Давайте создадим первую локацию</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link to={"create"}>
          <Button 
            variant={"dashed"}
            size={"size_54"} 
            animation={"toggle_sm"}
            iconLeft={<AddFillIcon width={22} height={22} className="text-primary"/>}
          >Добавить локацию
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  )
}

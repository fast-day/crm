import { AddFillIcon, PaletteIcon } from "@/shared/icons"
import { Button, Empty } from "@/shared/ui"
import { EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui/empty/ui/empty"
import { Link } from "@tanstack/react-router"

export const ServicesEmpty = () => {
  return (
    <Empty className="flex-1 h-full">
      <EmptyHeader>
        <EmptyMedia variant={"empty"}>
          <PaletteIcon />
        </EmptyMedia>
        <EmptyTitle>Услуг пока нет</EmptyTitle>
        <EmptyDescription>Создайте первую услугу, чтобы клиенты могли на неё записаться</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link to={"create"}>
          <Button 
            variant={"dashed"}
            size={"size_54"} 
            animation={"toggle_sm"}
            iconLeft={<AddFillIcon width={22} height={22} className="text-primary"/>}
          >Добавить услугу
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  )
}

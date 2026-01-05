import Svg404 from "@/shared/icons/404"
import { Button, Empty } from "@/shared/ui"
import { EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui/empty/ui/empty"
import { Link, useRouter } from "@tanstack/react-router"

export const NotFound = () => {
  const router = useRouter();
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <Svg404 />
        </EmptyMedia>
        <EmptyTitle>Страница не найдена</EmptyTitle>
        <EmptyDescription>
            Страница, которую вы ищете, не существует или была удалена.
            Возможно, она была перемещена или переименована.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button onClick={() => router.history.back()} variant={"accent"} size={"size_38"} active={"scale_98"}>Вернуться назад</Button>
          <Link to={"/"}>
            <Button variant={"secondary"} size={"size_38"} active={"scale_98"}>На главную</Button>
          </Link>
        </div>
      </EmptyContent>
    </Empty>
  )
}

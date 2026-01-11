import { NetworkOffIcon, NetworkOnIcon } from "@/shared/icons"
import { Empty } from "@/shared/ui"
import { EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui/empty/ui/empty"
import { useHealth } from "../model/hook/health.hook";

export const NetworkServer = () => {
  const { success } = useHealth();

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant={success ? "network_success" : "network_error"}>
          {success ? (
            <NetworkOnIcon width={64} height={64} />
          ) : (
            <NetworkOffIcon width={64} height={64} />
          )}
        </EmptyMedia>
        <EmptyTitle>{success ? "Всё работает!" : "Сейчас мы немного зависли"}</EmptyTitle>
        <EmptyDescription>
          {success ? "Можете продолжать пользоваться приложением без ограничений." : "Но не волнуйтесь, скоро всё вернётся в норму!"}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

import { Button } from "@/shared/ui"
import { useRouter } from "@tanstack/react-router"

export const GoBackButton = () => {
  const router = useRouter();

  return <Button onClick={() => router.history.back()}>Вернуться назад</Button>
}

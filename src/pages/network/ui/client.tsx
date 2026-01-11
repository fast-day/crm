import { Empty } from "@/shared/ui";
import { EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui/empty/ui/empty";
import { ConfettiIcon, WorldOffIcon } from "@/shared/icons";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useNavigatorOnline } from "@/shared/hooks";

export const NetworkClient = () => {
  const inOnline = useNavigatorOnline();
  const navigate = useNavigate();

  useEffect(() => {
    if (!inOnline) return;

    const timer = setTimeout(() => navigate({ to: "/" }), 2500);
    return () => clearTimeout(timer);
  }, [inOnline, navigate]);

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant={inOnline ? "default" : "network_error"}>
          {inOnline ? (
            <ConfettiIcon width={64} height={64} color="#FF7701" />
          ) : (
            <WorldOffIcon width={64} height={64} />
          )}
        </EmptyMedia>
        <EmptyTitle>{inOnline ? "Хэй-хо, мы снова онлайн!" : "Эй, куда делась связь?"}</EmptyTitle>
        <EmptyDescription>
          {inOnline ? "Все функции приложения теперь доступны вам." : "Проверьте настройки Wi-Fi или мобильного интернета и повторите попытку."}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

import { Button } from "@/shared/ui";
import { toast } from "sonner";

export const ShareLinkCard = ({ bookingUrl }: { bookingUrl: string }) => {
  const copy = async () => {
    await navigator.clipboard.writeText(bookingUrl);
    toast.success("Ссылка скопирована");
  };

  const share = async () => {
    if (!navigator.share) return copy();
    try {
      await navigator.share({ title: "Онлайн-запись", url: bookingUrl });
    } catch (e) {
      if ((e as DOMException).name !== "AbortError") await copy();
    }
  };

  return (
    <div className="rounded-2xl border-2 border-border p-5 space-y-3">
      <div className="space-y-1">
        <p className="text-base font-bold">Отлично, полдела сделано!</p>
        <p className="text-xs opacity-60">
          Теперь можно поделиться ссылкой на онлайн-запись, чтобы клиенты записывались сами. Или добавить первых клиентов и записи вручную.
        </p>
      </div>
      <Button type="button" size="size_38" className="font-medium" onClick={share}>Поделиться ссылкой</Button>
    </div>
  );
};
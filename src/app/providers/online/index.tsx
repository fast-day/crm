import { useNavigatorOnline } from "@/shared/hooks";
import { useEffect } from "react";

export const OnlineHandler = () => {
  const isOnline = useNavigatorOnline();

  useEffect(() => {
    document.body.style.overflow = isOnline ? "" : "hidden";
  }, [isOnline]);

  if (isOnline) return null;

  return (
    <div className="fixed w-full h-full top-0 left-0 z-99 border-4 bg-card-accent/30 border-red flex justify-center p-5">
      <div className="py-3 px-6 bg-white md:w-fit w-full max-w-105 mx-auto h-fit text-center rounded-12!">
        <p className="text-red text-sm font-semibold">Нет подключения к сети</p>
      </div>
    </div>
  );
}

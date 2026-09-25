import { useNavigatorOnline } from "@/shared/hooks";
import { useEffect } from "react";

export const OnlineHandler = () => {
  const isOnline = useNavigatorOnline();

  useEffect(() => {
    document.body.style.overflow = isOnline ? "" : "hidden";
  }, [isOnline]);

  if (isOnline) return null;

  return (
    <div className="fixed w-full h-full top-0 left-0 z-99 border-4 backdrop-blur-2 border-red flex justify-center">
      <div className="p-2.5 bg-red/30 backdrop-blur-3xl w-full h-fit text-center">
        <p className="text-red font-semibold">Нет подключения к сети</p>
      </div>
    </div>
  );
}

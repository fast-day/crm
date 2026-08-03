import { OnlineHandler } from "@/app/providers/online";
import { NavigationHandler } from "@/features/navigation";
import { AppLoading } from "@/widgets/loading";
import { Outlet } from "@tanstack/react-router";
import { useInitialize } from "../model/hooks/initialize.hook";

export const InitializedApp = () => {
  const { isInitialized } = useInitialize();

  if (!isInitialized) {
    return (
      <div className="flex flex-1 min-h-full relative">
        <AppLoading />
      </div>
    );
  }

  return (
    <>
      <Outlet />
      <OnlineHandler />
      <NavigationHandler />
    </>
  )
}

import { AppLoading } from "@/widgets/loading";
import { Outlet } from "@tanstack/react-router";
import { useInitialize } from "../model/hooks/initialize.hook";

export const InitializedApp = () => {
  const { isLoading, isInitialized } = useInitialize();

  console.log(isLoading)

  if (!isInitialized) {
    return (
      <div className="flex flex-1 relative">
        <AppLoading />
      </div>
    );
  }

  return (
    <>
      <Outlet />
    </>
  )
}

import { getCookie } from "@/shared/utils"
import { Navigate, useLocation } from "@tanstack/react-router";
import type { PropsWithChildren } from "react"

export const AuthLayout = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const isAccess = !!getCookie("access_token");

  if (isAccess) {
    const from = location.search.from || "/";
    return <Navigate to={from} replace />;
  }

  return (
    <div className="max-w-sm mx-auto w-full flex flex-col flex-1 justify-center">{children}</div>
  )
}

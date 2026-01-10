import { useNavigatorOnline } from "@/shared/hooks";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const OnlineHandler = () => {
  const isOnline = useNavigatorOnline();

  const navigate = useNavigate();

  console.log(isOnline)

  useEffect(() => {
    if (!isOnline) {
      navigate({ to: "/", replace: true });
    };
  }, [isOnline]);

  return null;
}

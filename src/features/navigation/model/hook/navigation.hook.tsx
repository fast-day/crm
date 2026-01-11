import { navigationSelector, resetRedirect } from "@/entities/navigation";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const NavigationHandler = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { to } = useAppSelector(navigationSelector);

  useEffect(() => {
    if (to) {
      navigate({ to: to, replace: true });
      dispatch(resetRedirect());
    }
  }, [to]);

  return null;
}

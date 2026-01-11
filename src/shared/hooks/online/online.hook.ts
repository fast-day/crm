import { getOnlineStatus } from "@/shared/lib";
import { useEffect, useState } from "react"

export const useNavigatorOnline = (): boolean => {
  const [status, setStatus] = useState(getOnlineStatus());

  const setOnlineStatus = () => setStatus(true);
  const setOfflineStatus = () => setStatus(false);

  useEffect(() => {
    window.addEventListener("online", setOnlineStatus);
    window.addEventListener("offline", setOfflineStatus);

    return () => {
      window.removeEventListener("online", setOnlineStatus);
      window.removeEventListener("offline", setOfflineStatus);
    }
  }, []);

  return status;
}

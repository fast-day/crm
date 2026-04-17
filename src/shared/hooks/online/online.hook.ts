import { GET_ONLINE_STATUS } from "@/shared/lib";
import { useEffect, useState } from "react"

export const useNavigatorOnline = (): boolean => {
  const [status, setStatus] = useState(GET_ONLINE_STATUS());

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

import { setLocation } from "@/entities/account";
import { baseQuery } from "@/shared/api/base/setting/base-query";
import type { BaseQueryApi } from "@reduxjs/toolkit/query";

const inflight: { current: Promise<void> | null } = { current: null };

export const refreshLocation = (api: BaseQueryApi, opt: object): Promise<void> => {
  inflight.current ??= (async () => {
    const me = await baseQuery({ url: "/v1/me", method: "GET" }, api, opt);
    const location = (me.data as { locations?: unknown[] } | undefined)?.locations?.[0];

    if (!location) {
      localStorage.removeItem("location");
      return;
    }

    localStorage.setItem("location", JSON.stringify(location));
    api.dispatch(setLocation(location as never));
  })().finally(() => { inflight.current = null; });

  return inflight.current;
};

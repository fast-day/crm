import { API } from "@/shared/api";
import { apiVersion } from "@/shared/constants";

export const AccountApi = API.injectEndpoints({
  endpoints: build => ({
    me: build.query<void, void>({
      query: () => ({
        url: `/${apiVersion}/me`,
        method: "GET",
      }),
    }),
  }),
});

export const { useMeQuery } = AccountApi;
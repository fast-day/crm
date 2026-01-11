import { API } from "@/shared/api";

export const HealthApi = API.injectEndpoints({
  endpoints: build => ({
    health: build.query<{ success: boolean }, void>({
      query: () => ({
        url: "/v1/health",
        method: "GET",
      }),
    }),
  }),
});

export const { useHealthQuery, useLazyHealthQuery } = HealthApi;

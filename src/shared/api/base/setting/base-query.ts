import { apiUrl } from "@/shared/constants";
import { getCookie } from "@/shared/utils";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  prepareHeaders: (h) => {
    const token: string | null = getCookie("access_token");

    if (token) h.set("Authorization", `Bearer ${token}`);

    return h;
  },
  headers: {  },
});
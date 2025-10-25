import { createApi } from "@reduxjs/toolkit/query";
import { reauthQuery } from "./setting/reauth";

export const API = createApi({
  baseQuery: reauthQuery,
  reducerPath: "API",
  tagTypes: [],
  endpoints: () => ({}),
});

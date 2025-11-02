import { API } from "@/shared/api";
import { apiVersion } from "@/shared/constants";
import type { LoginCredentials } from "../model/types/login.type";
import type { UserSession } from "../model/types/auth.type";

export const AuthApi = API.injectEndpoints({
  endpoints: build => ({
    register: build.mutation<UserSession, LoginCredentials>({
      query: (body) => ({
        url: `/${apiVersion}/auth/register`,
        method: "POST",
        body,
      }),
    }),
    login: build.mutation<UserSession, LoginCredentials>({
      query: (body) => ({
        url: `/${apiVersion}/auth/login`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = AuthApi;

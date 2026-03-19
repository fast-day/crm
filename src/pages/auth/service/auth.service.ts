import { API } from "@/shared/api";
import type { LoginCredentials } from "../model/types/login.type";
import type { UserSession } from "../model/types/auth.type";
import type { RegisterCredentials } from "../model/types/register.type";
import type { ICheckInviteCredentials, ICheckInviteResponse } from "../model/types/invite.type";

export const AuthApi = API.injectEndpoints({
  endpoints: build => ({
    /** 
      ===== РЕГИСТРАЦИЯ =====
    **/
    register: build.mutation<UserSession, RegisterCredentials>({
      query: (body) => ({
        url: `/v1/auth/register`,
        method: "POST",
        body,
      }),
    }),
    
    /** 
      ===== АВТОРИЗАЦИЯ =====
    **/
    login: build.mutation<UserSession, LoginCredentials>({
      query: (body) => ({
        url: `/v1/auth/login`,
        method: "POST",
        body,
      }),
    }),

    /** 
      ===== ПРОВЕРКА ТОКЕНА СОТРУДНИКА =====
    **/
    checkInviteToken: build.mutation<ICheckInviteResponse, ICheckInviteCredentials>({
      query: (body) => ({
        url: `/v1/check-invite`,
        method: "POST",
        body,
      }),
    }),

    /** 
      ===== РЕГИСТРАЦИЯ СОТРУДНИКА =====
    **/
    invite: build.mutation<UserSession, ICheckInviteCredentials & RegisterCredentials>({
      query: (body) => ({
        url: `/v1/employee/register`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCheckInviteTokenMutation,
  useInviteMutation,
} = AuthApi;

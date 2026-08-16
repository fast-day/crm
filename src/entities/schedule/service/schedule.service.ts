import { API } from "@/shared/api";
import { type IScheduleDetail, type IScheduleCreateCredentials, type IScheduleCredentials, type ISchedule, type IScheduleEmployeeParams, type IScheduleUpdateCredentials, type IScheduleUpdateResponse, } from "../model/types/schedule.type";
import { buildQuery } from "@/shared/lib";

export const scheduleAPI = API.injectEndpoints({
  endpoints: builder => ({
    /** 
      ===== СОЗДАНИЕ РАСПИСАНИЯ ДЛЯ СОТРУДНИКА =====
    **/
    create: builder.mutation<ISchedule, IScheduleCreateCredentials>({
      query: ({ body, params }) => ({
        url: `/v1/schedule/${params.location_id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_res, error) => (error ? [] : [{ type: "SCHEDULE", id: "LIST" }]),
    }),

    /** 
      ===== ПОЛУЧЕНИЕ ДЕТАЛАЛЬНОГО РАСПИСАНИЯ СОТРУДНИКА =====
    **/
    getDetailEmployeeService: builder.query<IScheduleDetail, IScheduleCredentials>({
      query: ({ body, params }) => ({
        url: `/v1/schedule/${params.location_id}`,
        method: "GET",
        body,
      }),
    }),

    /** 
      ===== ПОЛУЧЕНИЕ ВСЕГО РАСПИСАНИЯ СОТРУДНИКА =====
    **/
    getEmployeeServices: builder.query<ISchedule[], IScheduleEmployeeParams>({
      query: ({ user_id, location_id, query }) => ({
        url: buildQuery(`/v1/schedule/${user_id}/${location_id}`, { ...query }),
        method: "GET",
      }),
      providesTags: res => res
          ? [...res.map(({ id }) => ({ type: "SCHEDULE" as const, id })), { type: "SCHEDULE" as const, id: "LIST" }]
          : [{ type: "SCHEDULE" as const, id: "LIST" }],
    }),

    /** 
      ===== РЕДАКТИРОВАНИЕ РАСПИСАНИЯ СОТРУДНИКА =====
    **/
    update: builder.mutation<IScheduleUpdateResponse, IScheduleUpdateCredentials>({
      query: ({ body, params }) => ({
        url: `/v1/schedule/${params.location_id}/schedule/${params.schedule_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_res, error, { params }) => error ? [] : [{ type: "SCHEDULE", id: params.schedule_id }],
    }),

    /** 
      ===== УДАЛЕНИЕ РАСПИСАНИЯ СОТРУДНИКА =====
    **/
    delete: builder.mutation<void, IScheduleCredentials>({
      query: ({ body, params }) => ({
        url: `/v1/schedule/${params.location_id}`,
        method: "DELETE",
        body,
      }),
    }),
  }),
});

export const {
  useCreateMutation,
  useGetDetailEmployeeServiceQuery,
  useLazyGetDetailEmployeeServiceQuery,
  useGetEmployeeServicesQuery,
  useLazyGetEmployeeServicesQuery,
  useUpdateMutation,
} = scheduleAPI;

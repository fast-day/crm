import { API } from "@/shared/api";
import { API_VERSION } from "@/shared/constants";
import type { IService, IServiceChangeResponse, IServiceCredentials, IServiceDeleteCredentials, IServiceDetailCredentials, IServiceEditCredentials, IServiceLocationsCredentials, IServices, IServiceUsersCredentials } from "../model/types/service.type";

const ServicesApi = API.injectEndpoints({
  endpoints: build => ({
    /**
      ===== СПИСОК ВСЕХ УСЛУГ =====
    **/
    getServices: build.query<IServices[], void>({
      query: () => ({
        url: `${API_VERSION}/services`,
        method: "GET",
      }),
    }),

    /**
      ===== ДЕТАЛИ УСЛУШИ =====
    **/
    getDetailService: build.query<IService, IServiceDetailCredentials>({
      query: ({ service_id }) => ({
        url: `${API_VERSION}/service/${service_id}`,
        method: "GET",
      }),
    }),

    /**
      ===== СОЗДАНИЕ УСЛУГИ =====
    **/
    createService: build.mutation<IServiceChangeResponse, IServiceCredentials>({
      query: (body) => ({
        url: `${API_VERSION}/service`,
        method: "POST",
        body,
      }),
    }),

    /**
      ===== РЕДАКТИРОВАНИЕ УСЛУГИ =====
    **/
    editService: build.mutation<ApiSuccess, IServiceEditCredentials>({
      query: ({ service_id, body }) => ({
        url: `${API_VERSION}/service/${service_id}`,
        method: "PATCH",
        body,
      }),
    }),

    /**
      ====== РЕДАКТИРОВАТЬ ПОЛЬЗОВАТЕЛЕЙ УСЛУГИ (ДОБАВИТЬ/УДАЛИТЬ СОТРУДНИКА) =====
    **/
    editUsersService: build.mutation<ApiSuccess, IServiceUsersCredentials>({
      query: ({ service_id, body }) => ({
        url: `${API_VERSION}/service/users/${service_id}`,
        method: "PUT",
        body,
      }),
    }),

    /**
      ===== РЕДАКТИРОВАТЬ ЛОКАЦИИ УСЛУГИ (ДОБАВИТЬ/УДАЛИТЬ ЛОКАЦИЮ) =====
    **/
    editLocationsService: build.mutation<ApiSuccess, IServiceLocationsCredentials>({
      query: ({ service_id, body }) => ({
        url: `${API_VERSION}/service/locations/${service_id}`,
        method: "PUT",
        body,
      }),
    }),

    /**
      ===== УДАЛЕНИЕ УСЛУГИ =====
    **/
    deleteService: build.mutation<ApiSuccess, IServiceDeleteCredentials>({
      query: ({ service_id }) => ({
        url: `${API_VERSION}/service/${service_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetServicesQuery,
  useLazyGetServicesQuery,
  useGetDetailServiceQuery,
  useLazyGetDetailServiceQuery,
  useCreateServiceMutation,
  useEditServiceMutation,
  useEditUsersServiceMutation,
  useEditLocationsServiceMutation,
  useDeleteServiceMutation,
} = ServicesApi;

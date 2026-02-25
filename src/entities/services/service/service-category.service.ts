import { API } from "@/shared/api";
import { API_VERSION } from "@/shared/constants";
import type { IServiceCategory, IServiceCategoryDeleteCredentials, IServiceCategoryCredentials, IServiceUpdateCategoryCredentials } from "../model/types/service-category.type";

const ServiceCategoryApi = API.injectEndpoints({
  endpoints: build => ({
    /**
      ===== СПИСОК ВСЕХ КАТЕРОГИЙ =====
    **/
    getServiceCategory: build.query<IServiceCategory[], void>({
      query: () => ({
        url: `${API_VERSION}/categories/service`,
        method: "GET",
      }),
    }),

    /**
      ===== СОЗДАНИЕ КАТЕРОГИИ =====
    **/
    createServiceCategory: build.mutation<IServiceCategory, IServiceCategoryCredentials>({
      query: (body) => ({
        url: `${API_VERSION}/service/category`,
        method: "POST",
        body,
      }),
    }),

    /**
      ----- TODO: ДОБАВИТЬ РУЧКУ -----
      ===== РЕДАКТИРОВАНИЕ КАТЕРОГИИ =====
    **/
    editServiceCategory: build.mutation<IServiceCategory, IServiceUpdateCategoryCredentials>({
      query: ({ category_id, body }) => ({
        url: `${API_VERSION}/service/category/${category_id}`,
        method: "PUT",
        body,
      }),
    }),

    /**
      ===== УДАЛЕНИЕ УСЛУГИ =====
    **/
    deleteServiceCategory: build.mutation<IServiceCategory, IServiceCategoryDeleteCredentials>({
      query: ({ category_id }) => ({
        url: `${API_VERSION}/service/${category_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetServiceCategoryQuery,
  useLazyGetServiceCategoryQuery,
  useCreateServiceCategoryMutation,
  useEditServiceCategoryMutation,
  useDeleteServiceCategoryMutation,
} = ServiceCategoryApi;
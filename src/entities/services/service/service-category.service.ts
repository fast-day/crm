import { API } from "@/shared/api";
import type { IServiceCategory, IServiceCategoryDeleteCredentials, IServiceCategoryCredentials, IServiceUpdateCategoryCredentials } from "../model/types/service-category.type";

const ServiceCategoryApi = API.injectEndpoints({
  endpoints: build => ({
    /**
      ===== СПИСОК ВСЕХ КАТЕРОГИЙ =====
    **/
    getServiceCategory: build.query<IServiceCategory[], void>({
      query: () => ({
        url: `/v1/categories/service`,
        method: "GET",
      }),
    }),

    /**
      ===== СОЗДАНИЕ КАТЕРОГИИ =====
    **/
    createServiceCategory: build.mutation<IServiceCategory, IServiceCategoryCredentials>({
      query: (body) => ({
        url: `/v1/service/category`,
        method: "POST",
        body,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            ServiceCategoryApi.util.updateQueryData(
              "getServiceCategory",
              undefined,
              (d) => { d.push(data) })
          );
        } catch { /* */ }
      },
    }),

    /**
      ----- TODO: ДОБАВИТЬ РУЧКУ -----
      ===== РЕДАКТИРОВАНИЕ КАТЕРОГИИ =====
    **/
    editServiceCategory: build.mutation<IServiceCategory, IServiceUpdateCategoryCredentials>({
      query: ({ category_id, body }) => ({
        url: `/v1/service/category/${category_id}`,
        method: "PUT",
        body,
      }),

      async onQueryStarted({ category_id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            ServiceCategoryApi.util.updateQueryData(
              "getServiceCategory",
              undefined,
              (d) => {
                const idx = d.findIndex(c => c.id === category_id);
                if (idx !== -1) d[idx] = data;
              })
          );
        } catch { /* */ }}
    }),

    /**
      ===== УДАЛЕНИЕ КАТЕГОРИИ =====
    **/
    deleteServiceCategory: build.mutation<IServiceCategory, IServiceCategoryDeleteCredentials>({
      query: ({ category_id }) => ({
        url: `/v1/service/${category_id}`,
        method: "DELETE",
      }),

      async onQueryStarted({ category_id }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          ServiceCategoryApi.util.updateQueryData(
            "getServiceCategory",
            undefined,
            (d) => {
              const idx = d.findIndex(c => c.id === category_id);
              if (idx !== -1) d.splice(idx, 1);
            })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
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
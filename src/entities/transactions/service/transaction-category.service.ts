import { API } from "@/shared/api";
import { buildQuery } from "@/shared/lib";
import type { ITransactionCategory, ITransactionCategoryQuery } from "../model/types/transaction-category.types";

export const transactionCategoryApi = API.injectEndpoints({
  endpoints: builder => ({

    /**
      ===== СПИСОК ВСЕХ КАТЕГОРИЙ =====
    **/
    getTransactionCategories: builder.query<ApiResponse<ITransactionCategory>, ITransactionCategoryQuery>({
      query: ({  ...query }) => ({
        url: buildQuery(`/v1/transactions/category`, { ...query }),
        method: "GET",
      }),
    }),

    /**
      ===== СОЗДАНИЕ КАТЕГОРИИ =====
    **/
    createTransactionCategory: builder.mutation<ITransactionCategory, Partial<Omit<ITransactionCategory, "id" | "type">>>({
      query: (body) => ({
        url: `/v1/transactions/category`,
        method: "POST",
        body,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            transactionCategoryApi.util.updateQueryData(
              "getTransactionCategories",
              {},
              (d) => { d.data.push(data) })
          );
        } catch { /* */ }
      },
    }),

    /**
      ===== РЕДАКТИРОВАНИЕ КАТЕГОРИИ =====
    **/
    updateTransactionCategory: builder.mutation<ITransactionCategory, Partial<Omit<ITransactionCategory, | "type">>>({
      query: ({ id, ...body }) => ({
        url: `/v1/transactions/category/${id}`,
        method: "POST",
        body,
      }),

      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            transactionCategoryApi.util.updateQueryData(
              "getTransactionCategories",
              {},
              (d) => {
                const idx = d.data.findIndex(c => c.id === id);
                if (idx !== -1) d.data[idx] = data;
              })
          );
        } catch { /* */ }}
    }),
    
    /**
      ===== УДАЛЕНИЕ КАТЕГОРИИ =====
    **/
    deleteTransactionCategory: builder.mutation<ITransactionCategory, { category_id: number }>({
      query: ({ category_id }) => ({
        url: `/v1/transactions/category/${category_id}`,
        method: "DELETE",
      }),

      async onQueryStarted({ category_id }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          transactionCategoryApi.util.updateQueryData(
            "getTransactionCategories",
            {},
            (d) => {
              const idx = d.data.findIndex(c => c.id === category_id);
              if (idx !== -1) d.data.splice(idx, 1);
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
  useGetTransactionCategoriesQuery,
  useCreateTransactionCategoryMutation,
  useUpdateTransactionCategoryMutation,
  useDeleteTransactionCategoryMutation,
} = transactionCategoryApi;

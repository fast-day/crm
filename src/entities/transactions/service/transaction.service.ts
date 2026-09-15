import { API } from "@/shared/api";
import { buildQuery } from "@/shared/lib";
import type { ITransaction, ITransactionCreateCredentials, ITransactionQuery, ITransactionDetail, TransactionResponse } from "../model/types/transaction.types";

export const transactionApi = API.injectEndpoints({
  endpoints: builder => ({

    /**
      ===== СПИСОК ВСЕХ ТРАНЗАКЦИЙ =====
    **/
    getTransactions: builder.query<ApiResponse<TransactionResponse>, ITransactionQuery>({
      query: ({  ...query }) => ({
        url: buildQuery(`/v1/transactions`, { ...query }),
        method: "GET",
      }),
    }),

    /**
      ===== ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О ТРАНЗАКЦИИ =====
    **/
    getTransaction: builder.query<ITransactionDetail, { transaction_id: string }>({
      query: ({  transaction_id }) => ({
        url: `/v1/transactions/${transaction_id}`,
        method: "GET",
      }),
    }),

    /**
      ===== СОЗДАНИЕ ТРАНЗАКЦИИ =====
    **/
    createTransaction: builder.mutation<ITransaction, ITransactionCreateCredentials>({
      query: (body) => ({
        url: `/v1/transactions`,
        method: "POST",
        body,
      }),
    }),

  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionQuery,
  useCreateTransactionMutation,
} = transactionApi;

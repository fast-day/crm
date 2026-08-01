import { API } from "@/shared/api";
import { buildQuery } from "@/shared/lib";
import type { IOrder, IOrderDetail, IOrderPaidCredentials, IOrderQuery } from "../model/types/order.type";

export const orderApi = API.injectEndpoints({
  endpoints: builder => ({

    /**
      ===== СПИСОК ВСЕХ ЗАКАЗОВ =====
    **/
    getOrders: builder.query<ApiResponse<IOrder>, IOrderQuery>({
      query: ({  ...query }) => ({
        url: buildQuery(`/v1/orders`, { ...query }),
        method: "GET",
      }),
    }),

    /**
      ===== ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О ЗАКАЗЕ =====
    **/
    getOrder: builder.query<IOrderDetail, { order_id: string }>({
      query: ({  order_id }) => ({
        url: `/v1/orders/${order_id}`,
        method: "GET",
      }),
    }),

    /**
      ===== СОЗДАНИЕ ЗАКАЗА =====
    **/
   createOrder: builder.mutation<IOrderDetail, { booking_id: string }>({
    query: ({ booking_id }) => ({
      url: `/v1/orders/${booking_id}`,
      method: "POST"
    }),
   }),

    /**
      ===== ОТМЕНА ЗАКАЗА =====
    **/
   cancelOrder: builder.mutation<IOrderDetail, { order_id: string }>({
    query: ({ order_id }) => ({
      url: `/v1/orders/${order_id}/cancel`,
      method: "POST"
    }),

    async onQueryStarted({ order_id }, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        dispatch(orderApi.util.updateQueryData(
          "getOrder",
          { order_id },
          (d) => { Object.assign(d, data) }
        ));
      } catch { /* */ }
    }
   }),

    /**
      ===== ВОЗВРАТ СРЕДСТВ =====
    **/
   refundOrder: builder.mutation<IOrderDetail, { order_id: string }>({
    query: ({ order_id }) => ({
      url: `/v1/orders/${order_id}/refund`,
      method: "POST"
    }),

    async onQueryStarted({ order_id }, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        dispatch(orderApi.util.updateQueryData(
          "getOrder",
          { order_id },
          (d) => { Object.assign(d, data) }
        ));
      } catch { /* */ }
    }
   }),

    /**
      ===== ОПЛАТА ЗАКАЗА =====
    **/
   paidOrder: builder.mutation<IOrderDetail, IOrderPaidCredentials>({
    query: ({ order_id, body }) => ({
      url: `/v1/orders/${order_id}/paid`,
      method: "POST",
      body,
    }),
   }),

  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useLazyGetOrderQuery,
  
  useCreateOrderMutation,
  useCancelOrderMutation,
  useRefundOrderMutation,
  usePaidOrderMutation,
} = orderApi;

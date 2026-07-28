import { API } from "@/shared/api";
import type { IBooking, IBookingActionCredentials, IBookingCompleteResult, IBookingConfirmCredentials, IBookingConfirmResult, IBookingCredentials, IBookingDetail } from "../model/types/booking.type";
import { buildQuery } from "@/shared/lib";

export const bookingApi = API.injectEndpoints({
  endpoints: builder => ({

    /**
      ===== СПИСОК ВСЕХ БРОНИРОВАНИЙ =====
    **/
    getBookings: builder.query<ApiResponse<IBooking>, IBookingCredentials>({
      query: ({ location_id, ...query }) => ({
        url: buildQuery(`/v1/bookings/location/${location_id}`, { ...query }),
        method: "GET",
      }),
    }),

    /**
      ===== ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О БРОНИРОВАНИИ =====
    **/
    getBooking: builder.query<IBookingDetail, { booking_id: string }>({
      query: ({ booking_id }) => ({
        url: `/v1/booking/${booking_id}`,
        method: "GET",
      }),
      providesTags: ["BOOKINGS"]
    }),

    /**
      ===== СОЗДАНИЕ БРОНИРОВАНИЯ =====
    **/
    createBooking: builder.mutation<IBooking, IBookingActionCredentials>({
      query: (body) => ({
        url: `/v1/booking`,
        method: "POST",
        body,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: newBooking } = await queryFulfilled;

          dispatch(
            bookingApi.util.updateQueryData(
              "getBookings",
              { location_id: arg.location_id },
              (draft) => {
                draft.data.unshift(newBooking);
              }
            )
          );
        } catch { /* */ }
      },
    }),

    /**
      ===== ПОДТВЕРЖДЕНИЕ БРОНИРОВАНИЯ =====
    **/
    confirmBooking: builder.mutation<IBookingConfirmResult, IBookingConfirmCredentials>({
      query: ({ params, body }) => ({
        url: `/v1/booking/${params.booking_id}/confirm`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["BOOKINGS"],
    }),

    /**
      ===== ЗАВЕРШЕНИЕ БРОНИРОВАНИЯ =====
    **/
    completeBooking: builder.mutation<IBookingCompleteResult, { booking_id: string }>({
      query: ({ booking_id }) => ({
        url: `/v1/booking/${booking_id}/complete`,
        method: "PATCH",
      }),
      invalidatesTags: ["BOOKINGS"],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingQuery,
  useLazyGetBookingQuery,
  useCreateBookingMutation,
  useConfirmBookingMutation,
  useCompleteBookingMutation,
} = bookingApi;

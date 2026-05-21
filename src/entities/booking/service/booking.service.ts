import { API } from "@/shared/api";
import type { IBooking, IBookingActionCredentials, IBookingDetail } from "../model/types/booking.type";

export const bookingApi = API.injectEndpoints({
  endpoints: builder => ({

    /**
      ===== СПИСОК ВСЕХ БРОНИРОВАНИЙ =====
    **/
    getBookings: builder.query<IBooking[], { location_id: string }>({
      query: ({ location_id }) => ({
        url: `/v1/bookings/location/${location_id}`,
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
                draft.unshift(newBooking);
              }
            )
          );
        } catch { /* */ }
      },
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingQuery,
  useCreateBookingMutation,
} = bookingApi;

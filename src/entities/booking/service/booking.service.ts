import { API } from "@/shared/api";
import type { IBooking, IBookingActionCredentials, IBookingCalendarCredentials, IBookingChangeStatusCredentials, IBookingCredentials, IBookingDetail, ICalendarBookings } from "../model/types/booking.type";
import { buildQuery } from "@/shared/lib";

export const bookingApi = API.injectEndpoints({
  endpoints: builder => ({

    /**
      ===== СПИСОК ВСЕХ ЗАПИСЕЙ =====
    **/
    getBookings: builder.query<ApiResponse<IBooking>, IBookingCredentials>({
      query: ({ location_id, ...query }) => ({
        url: buildQuery(`/v1/bookings/location/${location_id}`, { ...query }),
        method: "GET",
      }),
      providesTags: ["BOOKINGS"]
    }),

    /**
      ===== СПИСОК ВСЕХ ЗАПИСЕЙ: КАЛЕНДАРЬ =====
    **/
    getCalendarBookings: builder.query<ICalendarBookings, IBookingCalendarCredentials>({
      query: ({ location_id, ...query }) => ({
        url: buildQuery(`/v1/bookings/calendar`, { location: location_id, ...query }),
        method: "GET",
      }),
    }),

    /**
      ===== ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О ЗАПИСИ =====
    **/
    getBooking: builder.query<IBookingDetail, { booking_id: string }>({
      query: ({ booking_id }) => ({
        url: `/v1/booking/${booking_id}`,
        method: "GET",
      }),
      providesTags: ["BOOKINGS"]
    }),

    /**
      ===== СОЗДАНИЕ ЗАПИСИ =====
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
      ===== ИЗМЕНЕНИЕ СТАТУСА ЗАПИСИ =====
    **/
    changeBookingStatus: builder.mutation<IBookingDetail, IBookingChangeStatusCredentials>({
      query: ({ params, ...body }) => ({
        url: `/v1/booking/${params.booking_id}`,
        method: "PUT",
        body,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            bookingApi.util.updateQueryData(
              "getBooking",
              { booking_id: arg.params.booking_id },
              (draft) => {
                Object.assign(draft, data)
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
  useGetCalendarBookingsQuery,
  useGetBookingQuery,
  useLazyGetBookingQuery,
  useCreateBookingMutation,
  useChangeBookingStatusMutation,
} = bookingApi;

import { API } from "@/shared/api";
import { API_VERSION } from "@/shared/constants";
import type { LocationCredentials, ILocationResponse, ILocationDetail, ILocationUser, ILocationUserQuery, UpdateLocationRequest, ChangeLocationStatusRequest } from "../model/types/location.type";

export const serviceAPI = API.injectEndpoints(({
  endpoints: (build) => ({
    getLocations: build.query<ILocationResponse[], void>({
      query: () => ({
        url: `/${API_VERSION}/locations`,
        method: "GET",
      }),
      providesTags: ["LOCATIONS"]
    }),
    getLocation: build.query<ILocationDetail, string>({
      query: (locationId) => ({
        url: `/${API_VERSION}/location/${locationId}`,
        method: "GET",
      }),
      providesTags: ["LOCATIONS"]
    }),
    getLocationUsers: build.query<ILocationUser[], string>({
      query: (locationId) => ({
        url: `/${API_VERSION}/locations/${locationId}/users`,
        method: "GET",
      }),
    }),
    getLocationUser: build.query<ILocationUser, ILocationUserQuery>({
      query: ({ location_id, user_id }) => ({
        url: `/${API_VERSION}/location/${location_id}/user/${user_id}`,
        method: "GET",
      }),
    }),
    createLocation: build.mutation<ILocationResponse, LocationCredentials>({
      query: (body) => ({
        url: `/${API_VERSION}/location`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["LOCATIONS"],
    }),
    editLocation: build.mutation<ILocationResponse, UpdateLocationRequest>({
      query: ({ location_id, body }) => ({
        url: `/${API_VERSION}/location/${location_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["LOCATIONS"],
    }),
    onlineLocation: build.mutation<void, ChangeLocationStatusRequest>({
      query: ({ locationId, active }) => ({
        url: `/${API_VERSION}/location/${locationId}/status`,
        method: "POST",
        body: { active },
      }),
      invalidatesTags: ["LOCATIONS"],
    }),
  }),
}));

export const {
  useGetLocationsQuery,
  useLazyGetLocationsQuery,
  useGetLocationQuery,
  useLazyGetLocationQuery,
  useGetLocationUsersQuery,
  useLazyGetLocationUsersQuery,
  useGetLocationUserQuery,
  useLazyGetLocationUserQuery,
  useCreateLocationMutation,
  useEditLocationMutation,
  useOnlineLocationMutation,
} = serviceAPI;
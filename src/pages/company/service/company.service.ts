import { API } from "@/shared/api";
import { apiVersion } from "@/shared/constants";
import type { ISpecialization } from "../model/type/specialization.type";
import type { IIndustry } from "../model/type/industry.type";
import type { CompanyCreateResponse, CompanyCredentials } from "../model/type/company-create.type";

export const companyApi = API.injectEndpoints({
  endpoints: (builder) => ({
    getSpecialization: builder.query<ISpecialization[], void>({
      query: () => ({
        url: `/${apiVersion}/company/specializations`,
        method: "GET",
      }),
    }),
    getSpecializationIndustry: builder.query<IIndustry[], number>({
      query: (specialization_id) => ({
        url: `/${apiVersion}/company/industry/${specialization_id}`,
        method: "GET",
      }),
    }),
    companyCreate: builder.mutation<CompanyCreateResponse, CompanyCredentials>({
      query: (body) => ({
        url: `/${apiVersion}/company`,
        method: "POST",
        body, 
      }),
    }),
  }),
});

export const {
  useGetSpecializationQuery,
  useGetSpecializationIndustryQuery, 
  useCompanyCreateMutation
} = companyApi;

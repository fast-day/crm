import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ServicePayload } from "../type/payload-service.type";

interface Company {
  name: string;
  currency: ICurrency;
  country: string;
  region: string;
  city: string;
  post_code?: string;
  street?: string;
  house?: string;
  timezone: string;
  timezone_offset: string;
  lat: string;
  lng: string;
  specialization?: number;
  industry?: number;
}

type CompanyState = {
  company: Company | undefined;
}

const initialState: CompanyState = {
  company: undefined,
}

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addCompany(state, action: PayloadAction<Company>) {
      state.company = action.payload;
    },
    addCompanyService(state, action: PayloadAction<ServicePayload>) {
      const company = state.company;
      const { specialization, industry } = action.payload;
      if (company) {
        company.specialization = specialization;
        company.industry = industry;
      }
    },
  },
});

export const { addCompany, addCompanyService } = companySlice.actions;
export default companySlice.reducer;
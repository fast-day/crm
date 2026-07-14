import type { IMe } from "@/entities/account";

export interface CompanyCredentials {
  name: string;
  currency: CurrencyType;
  timezone: string;
  timezone_offset: string;
}

export type CompanyCreateResponse = IMe;

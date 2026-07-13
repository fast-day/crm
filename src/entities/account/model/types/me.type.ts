import type { PageType } from "@/entities/settings";
import type { IRole } from "./role.type";

export interface IMeCompany {
  id: string;
  name: string;
  logo: string | null;
  site_url: string;
  currency: CurrencyType;
}

export interface IMeLocationTimezone {
  timezone: string;
  timezone_offset: string;
}

export interface IMeLocationAddressMap {
  lat: string | null;
  lng: string | null;
}

export interface IMeLocationAddress {
  full_address: string | null;
  street: string | null;
  house: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  post_code: string | null;
  map: IMeLocationAddressMap;
}

export interface MeLocation {
  id: string;
  name: string;
  avatar: string;
  full_address: string;
  timezone: IMeLocationTimezone;
  address: IMeLocationAddress;
}

export interface MeSettingPages {
  page: PageType;
  is_visible: boolean;
}

export interface MeSettings {
  pages: MeSettingPages[];
  is_survey: boolean;
}

export interface IMe {
  id: string;
  email: string;
  phone: string;
  role: IRole;
  role_id: { id: number; };
  first_name: string;
  last_name: string;
  full_name: string;
  avatar: string | null;
  locations: MeLocation[];
  company: IMeCompany | null;
  settings: MeSettings;
}

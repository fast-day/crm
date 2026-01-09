import type { IRole, IUserProfile } from "@/entities/account";

export interface ILocationAddress {
  full_address: string;
  street: string | null;
  house: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
}

export type IMap = {
  lat: string;
  lng: string;
}

export interface ILocation {
  id: string;
  name: string;
  avatar: string | null;
  description: string | null;
  phone: string;
  category: string[];
  comfort: string[];
}

export interface ILocationResponse extends ILocation {
  address: ILocationAddress,
}

export interface ILocationUser {
  user_id: string;
  role: IRole;
  is_banned: boolean;
  profile: IUserProfile;
}

export interface ILocationUserQuery {
  location_id: string;
  user_id: string;
}

export interface ILocationDetail extends ILocation {
  timezone: string;
  user_count: number;
  address: ILocationAddress & {
    post_code: number | null;
    map: IMap;
  };
}

export interface CreateLocationRequest {
  name: string;
  description?: string;
  phone: string;
  city?: string;
  street?: string;
  country: string;
  region?: string;
  timezone: string;
  timezone_offset: string;
  lat: string;
  lng: string;
}

export interface UpdateLocationRequest {
  location_id: string;
  body: CreateLocationRequest;
}

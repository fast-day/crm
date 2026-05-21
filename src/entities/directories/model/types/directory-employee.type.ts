import type { RoleType } from "@/entities/account";

export interface IDirectoryEmployee {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: RoleType;
  profile_id: string;
  position: string;
  avatar: string;
}

export interface IDirectoryLocationEmployee extends IDirectoryEmployee {
  services: Array<{ id: string }>;
  schedule: Array<{ date: string }>;
}

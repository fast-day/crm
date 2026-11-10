import type { EmployeeStatus } from "@/entities/employee";
import type { ImageUrls } from "@/entities/user";

/**
  &&&&& УБРАТЬ NAME ЗАМЕНИВ ЕГО НА FULL_NAME &&&&&
**/
export interface IUserProfile {
  id: string;
  email: string;
  name: string;
  full_name: string;
  phone: string;
  avatar: ImageUrls;
  status: EmployeeStatus;
  position: string | null;
}

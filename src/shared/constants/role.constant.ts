import type { IRole } from "@/entities/account";

export const ROLE: Record<IRole, string> = {
  owner: "Владелец",
  admin: "Админ",
  employee: "Сотрудник",
};

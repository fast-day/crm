import type { EmployeeStatus } from "@/entities/employee";

export const EMPLOYEE_STATUS: Record<EmployeeStatus, string> = {
  active: "Активный",
  inactive: "Не активный",
  invited: "Приглашение отправлено",
};

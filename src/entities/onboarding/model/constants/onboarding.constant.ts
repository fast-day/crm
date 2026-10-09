import type { TOnboardingStatus } from "../types/onboarding.type";

export type TOnboardingStep = {
  key: keyof TOnboardingStatus;
  title: string;
  href: string;
  minutes: number;
}

export const ONBOARDING_STEPS: TOnboardingStep[] = [
  { key: "has_services",  title: "Составте список услуг", href: "/business/services",   minutes: 3 },
  { key: "has_schedules", title: "Настройте расписание",  href: "/schedule",            minutes: 2 },
  { key: "has_customers", title: "Дабавьте клиентов",     href: "/customers",           minutes: 2 },
  { key: "has_bookings",  title: "Создать запись",        href: "/bookings",            minutes: 1 },
];

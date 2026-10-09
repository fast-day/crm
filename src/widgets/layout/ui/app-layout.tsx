import type { PropsWithChildren } from "react"
import { useSelector } from "react-redux";
import { useAccount } from "@/entities/account";
import { MobileSidebar, Sidebar } from "@/widgets/sidebar";
import { useMediaQuery } from 'react-responsive';
import { BaseLayout } from "./base-layout";
import { OnboardingProgress } from "@/widgets/onboarding";

export const AppLayout = ({ children }: PropsWithChildren) => {
  const { isCompany, account } = useSelector(useAccount);
  const isTablet = useMediaQuery({ query: `(max-width: 1100px)` })

  const sidebar = !isTablet && isCompany ? <Sidebar />
    : isTablet && isCompany ? <MobileSidebar /> : null;

  return (
    <BaseLayout sidebar={sidebar} mainClassName={!isTablet && isCompany ? "pl-59" : ""}>
      {children}
      {account && (
        <OnboardingProgress
          status={{
            has_customers: account.has_customers,
            has_bookings: account.has_bookings,
            has_services: account.has_services,
            has_schedules: account.has_schedules,
          }}
        />
      )}
    </BaseLayout>
  )
}
